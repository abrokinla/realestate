import os
from flask import Flask, jsonify, abort, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from models import db, setup_db, PropertyList, Agent, User

"""
PAGINATION
"""

PROPERTIES_PER_PAGE = 10
def paginate_properties(request, selection):
    page = request.args.get("page", 1, type=int)
    start = (page - 1) * PROPERTIES_PER_PAGE
    end = start + PROPERTIES_PER_PAGE

    properties = [myproperty.format() for myproperty in selection]
    current_properties = properties[start:end]

    return current_properties

def create_app(test_config=None):
    app = Flask(__name__)
    setup_db(app)

    
    # CORS HEADERS
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    # AFTER_REQUEST HEADERS
    @app.after_request
    def after_request(response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization,true')
        response.headers.add('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')

        return response


#--------------------------------ROUTES START-------------------
    
    """
    Fetch properties
    """ 
    @app.route('/properties', methods=['GET'])
    def get_properties():
        properties = PropertyList.query.order_by(PropertyList.id).all()
        current_properties = paginate_properties(request, properties)
        
        try:
            if len(current_properties) == 0:
                abort(404)

            return jsonify ({
                "success":True,
                'property':current_properties,
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
        agent_id = body.get('agent_id', None)

        try:
            newProperty = PropertyList(description= description, amount = amount, \
                location = location, bed = bed, bath = bath, toilet = toilet,\
                    action = action, status = status, agent_id=agent_id)
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
    def delete_property(property_id):
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
        pword = body.get('pword', None)
        tel = body.get('tel', None)
        agent_call_number = body.get('agent_call_number', None)
        whatsapp = body.get('whatsapp', None)
        business_web = body.get('business_web', None)

        try:
            newAgent = Agent(first_name=first_name, last_name=last_name, business_name=business_name,\
                email=email, pword=pword, tel=tel, agent_call_number=agent_call_number,\
                    whatsapp=whatsapp, business_web=business_web)
            
            newAgent.insert()

            agents = Agent.query.order_by(Agent.id).all()
            current_agents = paginate_properties(request, agents)


            return jsonify({
                'sucess':True,
                'created':newAgent.id,
                'agents':current_agents,
                'total_agents':len(agents)
            })
        except:
            abort(422)

    '''
    Fetch properties by agent
    '''
    @app.route('/agents/<agent_id>/properties', methods=['GET'])
    def get_agent_properties(agent_id):
        agents = Agent.query.filter_by(id=agent_id).one_or_none()

        try:
            if agents:
                properties = PropertyList.query.filter(PropertyList.agent_id == agent_id).all()
                current_properties = paginate_properties(request, properties)

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
        pword = body.get('pword', None)
        tel = body.get('tel', None)

        try:
            newUser = User(first_name=first_name, last_name=last_name, \
                email=email, pword=pword, tel=tel)

            newUser.insert()
        except:
            abort(422)

                
    #ERROR HANDLERS

    @app.errorhandler(404)
    def not_found(error):
        return jsonify({
                "success": False, 
                "error": 404, 
                "message": "resource not found"
                }), 404

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

    
    
    @app.errorhandler(500)
    def internal_server_error(error):
        return jsonify({
            "success": False, 
            "error": 500, 
            "message": "Internal Server Error"
            }), 500
    

    return app