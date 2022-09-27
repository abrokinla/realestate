import os
import unittest
import json
from flask_sqlalchemy import SQLAlchemy
from flaskr import create_app
from models import setup_db, PropertyList, Agent, User

class RealEstateTestCAse(unittest.TestCase):

    def setUp(self):
        self.app = create_app()
        self.client = self.app.test_client
        self.database_name = "realestdb_test"
        self.database_path = "postgresql://postgres:12345@localhost:5432/" +self.database_name

        setup_db(self.app, self.database_path)
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
        
        with self.app.app_context():
            self.db = SQLAlchemy()
            self.db.init_app(self.app)

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
                whatsap = self.db.Column(self.db.String)
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

            self.db.create_all()

        def tearDown(self):

            pass

        def test_get_propertylist(self):
            res = self.client().get("properties")
            data = json.loads(res.data)

            self.assertEqual(res.status_code, 200)
            self.assertEqual(data["success"], True)
            self.assertTrue(data["properties"])

        def test_get_propertylist_failure(self):
            res = self.client().delete("/properties")
            data = json.loads(res.data)

            self.assertEqual(res.status_code, 405)
            self.assertEqual(data["sucess"], False)
            self.assertTrue(data["message"], "method not allowed")

if __name__ == "__main__":
    unittest.main()    

