import os
import unittest
import json
from flask_sqlalchemy import SQLAlchemy
from flaskr import create_app
from models import setup_db, PropertyList, Agent, User

class RealEstateTestCase(unittest.TestCase):

    def setUp(self):
        self.app = create_app()
        self.client = self.app.test_client
        self.database_name = "realestdb_test"
        self.database_path = "postgresql://{}:{}@{}/{}".format("postgres", "12345", "localhost:5432", self.database_name)
        
        setup_db(self.app, self.database_path)
        
        with self.app.app_context():
            self.db = SQLAlchemy()
            self.db.init_app(self.app)

            
            self.new_agent = {
                "first_name":"John", 
                "last_name":"Ackerty", 
                "business_name":"Ackerty Properties",
                "email":"myemail@email.com", 
                "pword":"mypassword", 
                "tel":"+2348190907787", 
                "agent_call_number":"+2348190907787", 
                "whatsapp":"+2348190907787", 
                "business_web":"ackertyproperties.com"
                }
            self.new_property = {
                "description":"sample description of a property",
                "amount":"20000", 
                "location":"sample location",
                "bed":"2", 
                "bath":"2", 
                "toilet":"2",
                "action":"rent",
                "status":"renovated", 
                "agent_id":"1"
                }
            self.new_user = {
                "first_name":"John",
                "last_name":"Ackerty",
                "email":"myemail@email.com", 
                "pword":"mypassword", 
                "tel":"+2348190907787"
                }
        
            # Create tables
            class PropertyList(self.db.Model):
                __tablename__ = 'propertylist'

                id = self.db.Column(self.db.Integer, primary_key=True)
                description = self.db.Column(self.db.String)
                amount = self.db.Column(self.db.Integer)
                location = self.db.Column(self.db.String)
                bed = self.db.Column(self.db.Integer)
                bath = self.db.Column(self.db.Integer)
                toilet = self.db.Column(self.db.Integer)
                action = self.db.Column(self.db.String)
                status = self.db.Column(self.db.String)
                agent_id = self.db.Column(self.db.Integer, self.db.ForeignKey('agent.id'), nullable=False)

            class Agent(self.db.Model):
                __tablename__ = 'agent'

                id = self.db.Column(self.db.Integer, primary_key=True)
                first_name = self.db.Column(self.db.String)
                last_name = self.db.Column(self.db.String)
                business_name = self.db.Column(self.db.String)
                email = self.db.Column(self.db.String)
                pword = self.db.Column(self.db.String)
                tel = self.db.Column(self.db.String)
                agent_call_number = self.db.Column(self.db.String)
                whatsapp = self.db.Column(self.db.String)
                business_web = self.db.Column(self.db.String)
                properties = self.db.relationship('PropertyList', backref='list', lazy=True)


            class User(self.db.Model):
                __tablename__ = 'user'

                id = self.db.Column(self.db.Integer, primary_key=True)
                first_name = self.db.Column(self.db.String)
                last_name = self.db.Column(self.db.String)
                email = self.db.Column(self.db.String)
                pword = self.db.Column(self.db.String)
                tel = self.db.Column(self.db.String)

            # self.db.create_all()
            # print("created relations successfully")
    def tearDown(self):

        pass

    def test_200_get_propertylist(self):
        res = self.client().get("/properties")
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data["success"], True)
        self.assertTrue(data["property"])

    def test_405_get_propertylist_failure(self):
        res = self.client().delete("/properties")
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 405)
        self.assertEqual(data["success"], False)
        self.assertTrue(data["message"], "method not allowed")


    def test_200_get_paginated_properties(self):
        res = self.client().get("/properties")
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data["success"], True)
        self.assertTrue(data["total_properties"])
        self.assertTrue(len(data["property"]))

    def test_404_paginated_questions_failure(self):
        res = self.client().get("/properties?page=99999")
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 404)
        self.assertEqual(data["success"],False)
        self.assertEqual(data["message"], "resource not found")

    def test_200_delete_properties(self):
        res = self.client().delete("/properties/2")
        data = json.loads(res.data)

        properties = PropertyList.query.filter(PropertyList.id==2).one_or_none()

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data[("success")], True)
        self.assertEqual(data['deleted'],2)
        self.assertTrue(data['total_properties'])
        self.assertTrue(len(data['properties']))
        self.assertEqual(properties, None)

    def test_422_delete_properties_failure(self):
        res = self.client().delete("/properties/9999")
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 422)
        self.assertEqual(data["success"], False)
        self.assertEqual(data['message'],"unprocessable")

    def test_200_create_new_property(self):
        res = self.client().post('/properties', json = self.new_property)
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(data["success"], True)
        self.assertEqual(data["properties"])

        
    def test_405_create_new_property_failure(self):
        res = self.client().post("/properties/9999", json= self.new_property)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 405)
        self.assertEqual(data["success"],False)
        self.assertEqual(data["message"], "method not allowed")

    def test_200_create_new_agent(self):
        res = self.client().post("/agents", json = self.new_agent)
        data = json.loads(res.data)
        self.asertEqual(res.status_code,200)
        self.assertEqual(data["success"], True)

    def test_405_create_new_agent_failure(self):
        res = self.client().post("/properties/9999", json=self.new_agent)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 405)
        self.assertEqual(data["success"], False)
        self.assertEqual(data['message'],"method not allowed")

    def test_200_create_new_user(self):
        res = self.client().post("/users", json = self.new_user)
        data = json.loads(res.data)
        self.asertEqual(res.status_code,200)
        self.assertEqual(data["success"], True)
    
    def test_405_create_new_user(self):
        res = self.client().post("/userss/9999", json= self.new_user)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 405)
        self.assertEqual(data["success"],False)
        self.assertEqual(data["message"], "method not allowed")

    def test_200_update_properties(self):
        self.new_update = {
            'description':'A newly renovated 2 bed room flat for sale',
            'amount':'250000',
            'status':'sale'
        }
        res = self.client().patch("/properties/1", json=self.new_update)        
        data = json.loads(res.data)
        patch_property= PropertyList.query.filter(PropertyList.id == 2).one_or_none()

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)
        self.assertEqual(patch_property.format()['amount'],250000)

    def test_400_update_property_fail(self):
        res = self.client().patch("/properties/2",json=self.new_property)
        data = json.loads(res.data)

        self.assertEqual(res.status_code,400)
        self.assertEqual(data["success"], False)
        self.assertEqual(data["message"],"bad request")

    def test_200_get_agent_properties(self):
        res = self.client().get("/agents/1/properties")
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data["success"], True)
        self.assertEqual(data["first_name"],"John")
        self.assertNotEqual(len(data['properties']), 0)

    def test_404_fetch_properties_failure(self):
        res = self.client().get("/agents/9999/properties")
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 404)
        self.assertEqual(data["success"], False)
        self.assertEqual(data["message"], "resource not found")

    def test_200_search(self):
        search ={
            'search_Term':'Uyo'
        }
        res = self.client().post('/search', json = search)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)
        self.assertEqual(len(data['properties']))

    def test_404_search_not_found(self):
        search ={
            'search_Term':'khvkjgdty'
        }
        res = self.client().post('/search', json=search)
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 404)
        self.assertEqual(data['success'], False)
        self.assertEqual(data['message'], "resource not found")



if __name__ == "__main__":
    unittest.main()    

