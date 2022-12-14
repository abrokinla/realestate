import os
from google.oauth2.credentials import Credentials
from flask import Flask, jsonify, abort, request
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
import json
import firebase_admin
import pyrebase
from firebase_admin import credentials, auth
from functools import wraps
from flask_cors import CORS
from models import db, setup_db, PropertyList, Agent, User


def create_app(test_config=None):
    app = Flask(__name__)
    setup_db(app)    
    bcrypt = Bcrypt(app)

    
    firebaseConfig = {
        "apiKey": "AIzaSyC1Fynp1Af2o2PPterFCWvyWWsdG1O51J4",
        "authDomain": "real-estate-e45dd.firebaseapp.com",
        "projectId": "real-estate-e45dd",
        "storageBucket": "real-estate-e45dd.appspot.com",
        "messagingSenderId": "799389364325",
        "appId": "1:799389364325:web:9fa1f13cabd5471e9ed68c",
        "measurementId": "G-0Z72D2ZCD6",  
        "databaseURL":"https://real-estate-e45dd-default-rtdb.firebaseio.com"  
    };
    # CORS HEADERS
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    # AFTER_REQUEST HEADERS
    @app.after_request
    def after_request(response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization,true')
        response.headers.add('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')

        return response

    cred = credentials.Certificate(r"C:/re-fb-adminsdk.json")
    firebase_admin.initialize_app(cred) 


    # Create a decorator to handle authentication
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

            # Get the token from the header
            token = auth_header.split("Bearer ")[1]

            # Verify the token with Firebase
            try:
                decoded_token = auth.verify_id_token(token)
            except:
                # If the token is invalid, return an error
                return jsonify({"error": "Invalid token"}), 401

            # If the token is valid, extract the user's ID and role from the payload
            user_id = decoded_token["uid"]
            user_role = decoded_token.get("role", user_role)

            # Pass the user's ID and role to the route function
            kwargs["user_id"] = user_id
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

        # Try to sign in with Firebase
        try:
            user = auth2.sign_in_with_email_and_password(email, password)
        except:
            # If there was an error signing in, return an error
            return jsonify({
                "error": "Invalid email or password"
                }), 401

        # If the sign in was successful, return the ID token to the client
        return jsonify({
            "success": True,
            "token": user['idToken']
            })


            
    
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
    def new_property():    
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
        agent_id = body.get('agent_id', None)

        try:
            newProperty = PropertyList(description= description, amount = amount, \
                location = location, bed = bed, bath = bath, toilet = toilet,\
                    action = action, status = status, rating = rating, agent_id=agent_id, img_url=img_url)
            newProperty.insert()

            # return properties ordered by id
            properties = PropertyList.query.order_by(PropertyList.id).all()
            current_properties = paginate_properties(request, properties)

            return jsonify({
                "success":True,
                "created":newProperty.id,
                "properties":current_properties,
                "total_properties":len(properties)
            })
        except:
            abort(422)

    '''
    Edit Properties
    '''
    @app.route('/properties/<int:property_id>', methods=['PATCH'])    
    def update_properties(property_id):
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
        signup_type = body.get('signup_type', 'email')
        is_admin = False
        google_token = body.get('google_token', None)

        if signup_type is None:
            abort(400)

        if signup_type == "email":
            if email is None or pword is None:
                abort(400)

            try:
                user_exists = Agent.query.filter_by(email=email).first() is not None

                if user_exists:
                    abort(409)

                hashed_password = bcrypt.generate_password_hash(pword)
                
                user = auth.create_user(
                email=email,
                password=pword
                )
                auth.update_user(user.uid, custom_claims={
                    'user_role': 'agent',
                    'is_admin': is_admin})

                newAgent = Agent(first_name=first_name, last_name=last_name, business_name=business_name,\
                    email=email, pword=hashed_password, tel=tel, agent_call_number=agent_call_number,\
                        whatsapp=whatsapp, business_web=business_web, user_role=user_role, is_admin=is_admin)
                
                newAgent.insert()

                agents = Agent.query.order_by(Agent.id).all()
                return jsonify({
                    'sucess':True,
                    'created':user.uid,
                    'total_users':len(agents)
                })
            except:
                abort(422)
            

    '''
    Fetch properties by agent
    '''
    @app.route('/agents/<agent_id>/properties', methods=['GET'])
    # @check_token
    def get_agent_properties(agent_id):
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
            
            user = auth.create_user(
            email=email,
            password=pword
            )
            auth.update_user(user.uid, custom_claims={'user_role': 'user'})
            newUser = User(first_name=first_name, last_name=last_name, \
                email=email, pword=hashed_password, tel=tel, user_role=user_role)

            newUser.insert()
            users = User.query.order_by(User.id).all()

            return jsonify({
                'sucess':True,
                'created':user.uid,
                'total_users':len(users)
            })
        except:
            abort(422)
        
        
    @app.route('/search', methods=['POST'])
    def search_term():

        try:
            body = request.get_json()
            searchTerm = body.get('search_Term', None)

            propertylist = PropertyList.query.filter(PropertyList.location.ilike('%'+searchTerm+'%')).all()
            
            if propertylist:
                current_properties = paginate_properties(request, propertylist)
                return jsonify({
                    'success':True,
                    'properties':current_properties,
                    'total_properties':len(propertylist)
                })
            else:
                abort(404)
        except:
            abort(404)

       
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
            "message": "bad request"
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
    

    return app