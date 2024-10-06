import os
from dotenv import load_dotenv
from google.oauth2.credentials import Credentials
from flask import Flask, jsonify, abort, request
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from uuid import UUID
import json
import firebase_admin
import pyrebase
from firebase_admin import credentials
from firebase_admin import auth as firebase_auth
from functools import wraps
from flask_cors import CORS
from models import db, setup_db
from models_classes import PropertyList, Agent, User


def create_app(db_URI="", test_config=None):
    app = Flask(__name__)
    limiter = Limiter(app)
    limiter.key_func = get_remote_address
    if db_URI:
        setup_db(app,db_URI)
    else:
        setup_db(app)

    # setup_db(app)    
    bcrypt = Bcrypt(app)

    limiter.default_key_func = get_remote_address
    limiter.default_limits = ["20/second"]
    
    # CORS HEADERS
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    # AFTER_REQUEST HEADERS
    @app.after_request
    def after_request(response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization,true')
        response.headers.add('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')

        return response

    load_dotenv()
    cred_path = os.environ.get("REAL_ESTATE_FIREBASE_CRED_PATH")
    
    if not cred_path:
        raise ValueError("Missing FIREBASE_CRED_PATH environment variable")
    # Check if Firebase app is already initialized
    if not firebase_admin._apps:
        cred = credentials.Certificate(cred_path)
        firebase_admin.initialize_app(cred)


    def requires_auth(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            # Get the authorization header from the request
            auth_header = request.headers.get("Authorization")
            if not auth_header:
                # If the header is not present, return an error
                return jsonify({
                    "error": "Authorization header is required"
                }), 401
            
            # Check that the token is in the correct format (Bearer token)
            try:
                token = auth_header.split("Bearer ")[1]
            except IndexError:
                return jsonify({"error": "Authorization header format is 'Bearer <token>'"}), 401
            
            # Verify the token with Firebase
            try:
                decoded_token = firebase_auth.verify_id_token(token)
            except Exception as e:
                # If the token is invalid, return an error
                return jsonify({"error": f"Invalid token: {str(e)}"}), 401
            
            # If the token is valid, extract the user's ID and role from the payload
            agent_id = decoded_token.get("agent_id")
            user_role = decoded_token.get("user_role")
            
            # Ensure the token contains both agent_id and user_role
            if not agent_id or not user_role:
                return jsonify({"error": "Missing agent_id or user_role in token"}), 401
            
            # Pass the user's ID and role to the route function
            kwargs["agent_id"] = agent_id
            kwargs["user_role"] = user_role
            return f(*args, **kwargs)

        return decorated
    """
    PAGINATION
    """ 

    PROPERTIES_PER_PAGE = 12
    def paginate_properties(request, selection):
        page = request.args.get("page", 1, type=int)
        start = (page - 1) * PROPERTIES_PER_PAGE
        end = start + PROPERTIES_PER_PAGE

        properties = [myproperty.format() for myproperty in selection]
        current_properties = properties[start:end]

        return current_properties

        
    

#--------------------------------ROUTES START-------------------
    # Initialize a Firebase app using the Firebase configuration
    firebaseConfig = {
        "apiKey": os.environ.get("REAL_ESTATE_FIREBASE_API_KEY"),
        "authDomain": os.environ.get("REAL_ESTATE_FIREBASE_AUTH_DOMAIN"),
        "projectId": os.environ.get("REAL_ESTATE_FIREBASE_PROJECT_ID"),
        "storageBucket": os.environ.get("REAL_ESTATE_FIREBASE_STORAGE_BUCKET"),
        "messagingSenderId": os.environ.get("REAL_ESTATE_FIREBASE_MESSAGING_SENDER_ID"),
        "appId": os.environ.get("REAL_ESTATE_FIREBASE_APP_ID"),
        "measurementId": os.environ.get("REAL_ESTATE_FIREBASE_MEASUREMENT_ID"),
        "databaseURL": os.environ.get("REAL_ESTATE_FIREBASE_DATABASE_URL")
    }
    firebase = pyrebase.initialize_app(firebaseConfig)
    auth2 = firebase.auth()

    """
    Login
    """     
    @app.route("/login", methods=["POST"])
    def login():
        # Get the email and password from the request body
        body = request.get_json()
        email = body.get("email")
        password = body.get("password")       

        try:
            # Sign in the user with Firebase Authentication
            user = auth2.sign_in_with_email_and_password(email, password)

            # Fetch the user record from Firebase using their email
            user_record = firebase_auth.get_user_by_email(email)

            # Fetch agent details from your database based on the email
            agent = Agent.query.filter_by(email=email).first()

            # If the agent doesn't exist in your database, return an error
            if not agent:
                return jsonify({
                    "error": "Agent not found"
                }), 404

            # Set custom claims for the user (agent_id, user_role, etc.)
            firebase_auth.set_custom_user_claims(user_record.uid, {
                'agent_id': agent.id,  # Use the agent's actual ID from your database
                'user_role': agent.user_role,  # 'agent', 'user', etc.
                'is_admin': agent.is_admin ,
                'agent_name': agent.first_name
            })

        except Exception as e:
            print(f"Error signing in: {e}")
            # If there was an error signing in, return an error
            return jsonify({
                "error": "Invalid email or password"
            }), 401

        # Return the ID token to the client with a 'Bearer' prefix
        return jsonify({
            "success": True, 
            "token": "Bearer " + user['idToken']  # Return the Firebase ID token
        })

    """
        Verify Token
    """ 
    @app.route('/verify-token', methods=['POST'])
    def verify_token():
        # Get the token from the Authorization header
        auth_header = request.headers.get('Authorization')
        
        if not auth_header:
            return jsonify({'error': 'Authorization header is required'}), 401

        # The token might have the 'Bearer' prefix
        parts = auth_header.split(' ')
        
        # Check if the token is correctly prefixed with 'Bearer'
        if len(parts) != 2 or parts[0].lower() != 'bearer':
            return jsonify({'error': 'Invalid Authorization header format'}), 401

        token = parts[1]

        # Verify the token with Firebase
        try:
            decoded_token = firebase_auth.verify_id_token(token)
        except Exception as e:
            print(f"Token verification failed: {e}")
            return jsonify({'error': 'Invalid token'}), 401

        # Get the user's ID and role from the token
        agent_id = decoded_token.get('agent_id')
        user_role = decoded_token.get('user_role')

        return jsonify({
            'agent_id': agent_id, 
            'user_role': user_role
        }), 200


    """
    Fetch properties
    """ 
    @app.route('/properties', methods=['GET'])
    def get_properties():
        properties = PropertyList.query.order_by(PropertyList.rating).all()
        current_properties = paginate_properties(request, properties)
        
        try:
            if len(current_properties) == 0:
                abort(404)

            return jsonify ({
                "success":True,
                'properties':current_properties,
                'total_properties':len(properties)
            })
        except:
            abort(404)

           
        
    """
    Create new property
    """    
    @app.route('/properties', methods =['POST']) 
    @requires_auth   
    def new_property(agent_id, user_role): 
        if user_role != "agent":
            return jsonify({
                "error": "Unauthorized"
                }), 401
            
        body = request.get_json()
        description = body.get('description', None)
        amount = body.get('amount', None)
        location = body.get('location', None)
        bed = body.get('bed', None)
        bath = body.get('bath', None)
        toilet = body.get('toilet', None)
        action = body.get('action', None) 
        status = body.get('status', None)
        rating = body.get('rating', None)
        img_url = body.get('img_url', None)

        try:
            newProperty = PropertyList(
                description=description, amount=amount,
                location=location, bed=bed, bath=bath, toilet=toilet,
                action=action, status=status, rating=rating,
                agent_id=agent_id, img_url=img_url
            )
            newProperty.insert()

            properties = PropertyList.query.order_by(PropertyList.id).all()
            current_properties = paginate_properties(request, properties)

            return jsonify({
                "success": True,
                "created": newProperty.id,
                "properties": current_properties,
                "total_properties": len(properties)
            })
        except Exception as e:
            print(f"Error occurred: {e}") 
            abort(422)


    '''
    Edit Properties
    '''
    @app.route('/properties/<uuid:property_id>', methods=['PATCH'])
    @requires_auth
    def update_properties(property_id, user_role):
        if user_role != "agent":
            return jsonify({
                "error": "Unauthorized"
                }), 401

        body = request.get_json()
        try:
            propertyList = PropertyList.query.filter(PropertyList.id == property_id).one_or_none()
            if propertyList is None:
                abort(404)

            if "description" in body:
                propertyList.decription = body.get('description')
            if "amount" in body:
                propertyList.amount = int(body.get('amount'))
            if "location" in body:
                propertyList.location = body.get('location')
            if "bed" in body:
                propertyList.bed = int(body.get('bed'))
            if "bath" in body:
                propertyList.bath = int(body.get('bath'))
            if "toilet" in body:
                propertyList.toilet = int(body.get('toilet'))
            if "action" in body:
                propertyList.bed = body.get('action')
            if "status" in body:
                propertyList.status = (body.get('status'))            
            if "rating" in body:
                propertyList.rating = (body.get('rating'))
            if "img_url" in body:
                propertyList.img_url = (body.get('img_url'))
            

            propertyList.update()

            return jsonify ({
                'sucess':True,
                'property_id':propertyList.id
            })
        except:
            abort(400)

    '''
    Delete property
    '''
    @app.route('/properties/<int:property_id>', methods=['DELETE'])
    @requires_auth
    def delete_property(property_id, user_id, user_role):
        if user_role != "agent":
            return jsonify({
                "error": "Unauthorized"
                }), 401
        try:
            propertyList = PropertyList.query.filter(PropertyList.id == property_id).one_or_none()

            if propertyList is None:
                abort(404)

            propertyList.delete()

            properties = PropertyList.query.order_by(PropertyList.id).all()
            current_properties = paginate_properties(request, properties)

            return jsonify ({
                'success':True,
                'deleted':property_id,
                'properties':current_properties,
                'total_properties':len(properties)
            })
        except:
            abort(422)

    """
    Create new agent
    """
    @app.route('/agents', methods =['POST'])
    def new_agent():
        body = request.get_json()
        first_name = body.get('first_name', None)
        last_name = body.get('last_name', None)
        business_name = body.get('business_name', None)
        email = body.get('email', None)
        pword = body.get('password', None)
        tel = body.get('tel', None)
        agent_call_number = body.get('agent_call_number', None)
        whatsapp = body.get('whatsapp', None)
        business_web = body.get('business_web', None)
        user_role = 'agent'
        signup_type = 'email' #body.get('signup_type', None)
        is_admin = True

       

        if signup_type is None:
            print('No sign up type')
            abort(400)

        if signup_type == "email":        
            if email is None or pword is None:
                print('No email/password')
                abort(400)
        try:           
            user_exists = Agent.query.filter_by(email=email).first() is not None

            if user_exists:
                abort(409)

            hashed_password = bcrypt.generate_password_hash(pword)
            
            newAgent = Agent(
                first_name=first_name, 
                last_name=last_name, 
                business_name=business_name,
                email=email, 
                pword=hashed_password, 
                tel=tel, 
                agent_call_number=agent_call_number,
                whatsapp=whatsapp, 
                business_web=business_web, 
                user_role=user_role, 
                is_admin=is_admin
            )

            
            user = auth.create_user(
                email=email,
                password=pword
            )

            auth.update_user(user.uid, custom_claims={
                'user_role': 'agent',
                'is_admin': is_admin,
                'agent_id': newAgent.id
            })

            newAgent.insert()
            # db.session.close()

            agents = Agent.query.order_by(Agent.id).all()

            # db.session.close()

            return jsonify({
                'success': True,
                'created': newAgent.id,
                'total_users': len(agents)
            })

        except Exception as e:
            db.session.rollback()  # Rollback the transaction
            print(e)
            abort(422)

        finally:
            db.session.close()

        

    '''
    Fetch properties by agent
    '''
    @app.route('/agents/<agent_id>/properties', methods=['GET'])
    @requires_auth
    def get_agent_properties(agent_id, user_role):
        if user_role != "agent":
            return jsonify({
                "error": "Unauthorized"
                }), 401
        agents = Agent.query.filter_by(id=agent_id).one_or_none()

        try:
            if agents:
                properties = PropertyList.query.filter(PropertyList.agent_id == agent_id).all()
                current_properties = paginate_properties(request, properties)
                if (len(current_properties))==0:
                    abort(404)
                return jsonify ({
                    'success':True,
                    'properties':current_properties,
                    'total_properties':len(properties),
                    'agent_id':agents.id
                })
            else:
                abort(404)

        except:
            abort(404)

    
    '''
    Create new user
    '''
    @app.route('/users', methods=['POST'])
    def new_user():
        body= request.get_json()
        first_name = body.get('first_name', None)
        last_name = body.get('last_name', None)
        email = body.get('email', None)
        pword = body.get('password', None)
        tel = body.get('tel', None)
        user_role = 'user'
        signup_type = body.get('signup_type', None)
        google_token = body.get('google_token', None)

        if signup_type is None:
            abort(400)

        if signup_type == "email":
            if email is None or pword is None:
                abort(400)

        try:
            user_exists = User.query.filter_by(email=email).first() is not None

            if user_exists:
                abort(409)

            hashed_password = bcrypt.generate_password_hash(pword)
                        
            newUser = User(
                first_name=first_name,
                last_name=last_name,
                email=email, 
                pword=hashed_password, 
                tel=tel, 
                user_role=user_role
            )

            user = auth.create_user(
                email=email,
                password=pword
            )
            auth.update_user(user.uid, custom_claims={'user_role': 'user'})
            
            newUser.insert()
            users = User.query.order_by(User.id).all()

            return jsonify({
                'success':True,
                'created':user.uid,
                'total_users':len(users)
            })
        except Exception as e:
            db.session.rollback()  # Rollback the transaction
            print(e)
            abort(422)

        finally:
            db.session.close()
        
    '''
    Search
    '''
    @app.route('/search', methods=['POST'])
    def search_properties():
        try:
            body = request.get_json()
            description = body.get('description', None)
            location = body.get('location', None)
            amount = body.get('amount', None)

            query = PropertyList.query

            if description:
                query = query.filter(PropertyList.description.ilike('%'+description+'%'))
            if location:
                query = query.filter(PropertyList.location.ilike('%'+location+'%'))
            if amount:
                query = query.filter(PropertyList.amount >= amount)

            property_list = query.all()

            if property_list:
                current_properties = paginate_properties(request, property_list)
                return jsonify({
                    'success': True,
                    'properties': current_properties,
                    'total_properties': len(property_list)
                })
            else:
                abort(404)
        except:
            abort(404)

    '''
    Fetch agent details
    '''
    @app.route('/agents/<int:agent_id>', methods=['GET'])
    def get_agent(agent_id):
        try:
            agent = Agent.query.filter_by(id=agent_id).one_or_none()
            if agent is None:
                abort(404)
            else:
                return jsonify({
                    'success': True,
                    'agent': {
                        'id': agent.id,
                        'first_name': agent.first_name,
                        'last_name': agent.last_name,
                        'business_name': agent.business_name,
                        'email': agent.email,
                        'tel': agent.tel,
                        'agent_call_number': agent.agent_call_number,
                        'whatsapp': agent.whatsapp,
                        'business_web': agent.business_web
                    }
                })
        except:
            abort(422)


    
       
    #ERROR HANDLERS

    @app.errorhandler(405)
    def method_not_allowed(error):
        return jsonify({
                "success": False, 
                "error": 405, 
                "message": "method not allowed"
                }), 405
        

    @app.errorhandler(422)
    def unprocessable(error):
        return jsonify({
                "success": False, 
                "error": 422, 
                "message": "unprocessable"
                }),422          

    @app.errorhandler(400)
    def bad_request(error):
        return jsonify({
            "success": False, 
            "error": 400, 
            "message": "Bad request"
            }), 400

    @app.errorhandler(401)
    def bad_request(error):
        return jsonify({
            "success": False, 
            "error": 401, 
            "message": "Unauthorized Access"
            }), 401

    
    
    @app.errorhandler(409)
    def internal_server_error(error):
        return jsonify({
            "success": False, 
            "error": 409, 
            "message": "User Already Exists"
            }), 409

    @app.errorhandler(500)
    def internal_server_error(error):
        return jsonify({
            "success": False, 
            "error": 500, 
            "message": "Internal Server Error"
            }), 500

    # @limiter.limit_handler
    # def limit_handler():
    #     return "Rate limit exceeded. Please try again later.", 429

    

    return app