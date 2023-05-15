import os
import unittest
import json
from flaskr import create_app
from models import setup_db
from models_classes import PropertyList, Agent, User
class RealEstateTestCase(unittest.TestCase):
    print('about to start tests')
    def setUp(self):
        self.app = create_app()
        self.client = self.app.test_client        
        self.database_name = "realestdb_test"
        self.database_path = "postgresql+psycopg2://{}:{}@{}/{}".format(
            'postgres', '12345', 'localhost:5432', self.database_name
        )
        print('---here---')
        setup_db(self.app, self.database_path)
        with self.app.app_context():
            self.db.create_all()
            print("created relations successfully")

    
        self.new_agent = {
            "first_name":"John", 
            "last_name":"Ackerty", 
            "business_name":"Ackerty Properties",
            "email":"myemail@email.com", 
            "pword":"mypassword", 
            "tel":"+2348190907787", 
            "agent_call_number":"+2348190907787", 
            "whatsapp":"+2348190907787", 
            "business_web":"ackertyproperties.com",
            "user_role": "agent",
            "signup_type":"email"
            }

        self.new_property = {
            'description': 'A cozy apartment',
            'amount': 1000,
            'location': 'New York',
            'bed': 2,
            'bath': 1,
            'toilet': 1,
            'action': 'rent',
            'status': 'renovated',
            'rating': 3,
            'img_url': 'https://example.com/image.jpg',
            'agent_id': '3'
        }

        self.new_user = {
            "first_name":"John",
            "last_name":"Ackerty",
            "email":"myuseremail@email.com", 
            "pword":"mypassword", 
            "tel":"+2348190907787",
            "user_role":"user",
            "signup_type":"email"
            }


        class PropertyList(self.db.Model):
            __tablename__ = 'propertylist'
            id = self.db.Column(self.db.Integer, primary_key=True)
            description = self.db.Column(self.db.String())
            amount = self.db.Column(self.db.Integer)
            location = self.db.Column(self.db.String())
            bed = self.db.Column(self.db.Integer)
            bath = self.db.Column(self.db.Integer)
            toilet = self.db.Column(self.db.Integer)
            action = self.db.Column(self.db.String())#For sale or rent
            status = self.db.Column(self.db.String())
            rating = self.db.Column(self.db.Integer)
            img_url = self.db.Column(self.db.String())
            agent_id = self.db.Column(self.db.Integer, self.db.ForeignKey('agent.id'), nullable=False)

            

        class Agent(self.db.Model):
            __tablename__ = 'agent'
            id = self.db.Column(self.db.Integer, primary_key=True)
            first_name = self.db.Column(self.db.String())
            last_name = self.db.Column(self.db.String())
            business_name = self.db.Column(self.db.String())
            email = self.db.Column(self.db.String())
            pword = self.db.Column(self.db.String())
            tel =self. db.Column(self.db.String())
            agent_call_number = self.db.Column(self.db.String())
            whatsapp = self.db.Column(self.db.String())
            business_web = self.db.Column(self.db.String())
            user_role = self.db.Column(self.db.String())
            is_admin = self.db.Column(self.db.Boolean, default=False, nullable=False)
            properties= self.db.relationship('PropertyList', backref = 'list', lazy=True)

        class User(self.db.Model):
            __tablename__ = 'user'
            id = self.db.Column(self.db.Integer, primary_key=True)
            first_name = self.db.Column(self.db.String())
            last_name = self.db.Column(self.db.String())    
            email = self.db.Column(self.db.String())
            pword = self.db.Column(self.db.String())
            tel = self.db.Column(self.db.String())
            user_role = self.db.Column(self.db.String())
            
        
        
     
            
    def tearDown(self):
        pass

    def test_200_create_new_agent(self):
        res = self.client().post("/agents", json = self.new_agent)
        data = json.loads(res.data)
        self.assertEqual(res.status_code,200)
        self.assertEqual(data["success"], True)

      
    
if __name__ == "__main__":
    unittest.main()    

