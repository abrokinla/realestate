import os
import unittest
import json
import bcrypt
from flaskr import create_app
from models import setup_db
from models import PropertyList, Agent, User, db



def get_test_token(client):
    headers = {'Content-Type': 'application/json'}
    data = {'email': 'testuser@test.com', 'password': 'testpassword'}
    res = client().post('/login',headers=headers, json=data)
    token = json.loads(res.data)['token']
    return token
class RealEstateTestCase(unittest.TestCase):
    print('about to start tests')
    def setUp(self):
        self.database_name = "realestdb_test"
        self.database_path = "postgresql+psycopg2://{}:{}@{}/{}".format(
            'postgres', '12345', 'localhost:5432', self.database_name
        )
        
        self.app = create_app(self.database_path)
        self.client = self.app.test_client  

        password ="mypassword"
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        self.new_agent = {
            "first_name":"John", 
            "last_name":"Ackerty", 
            "business_name":"Ackerty Properties",
            "email":"tadlakey@gmail.com", 
            "password":hashed_password.decode('utf-8'),             
            "tel":"+2348190907787", 
            "agent_call_number":"+2348190907787", 
            "whatsapp":"+2348190907787", 
            "business_web":"ackertyproperties.com",
            "user_role": "agent",
            "signup_type":"email",
            "is_admin":False
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

        self.login = {
            'email':'tadlakey@gmail.com',
            'password': hashed_password.decode('utf-8')
        }

        self.new_user = {
            "first_name":"John",
            "last_name":"Ackerty",
            "email":"myuseremail@gmail.com", 
            "password":hashed_password.decode('utf-8'), 
            "tel":"+2348190907787",
            "user_role":"user",
            "signup_type":"email"
            }
           
    def tearDown(self):
        pass

    # def test_200_create_new_agent(self):
    #     res = self.client().post("/agents", json = self.new_agent)
    #     data = json.loads(res.data)
    #     self.assertEqual(res.status_code,200)
    #     self.assertEqual(data["success"], True)

    # def test_400_create_new_agent_failure(self):
    #     # Missing required data for user creation
    #     invalid_agent = {
    #         "first_name": "John",
    #         "last_name": "Doe"
    #         # Missing other required fields
    #     }

    #     res = self.client().post("/users", json=invalid_agent)
    #     data = json.loads(res.data)

    #     self.assertEqual(res.status_code, 400)
    #     self.assertEqual(data["success"], False)
    #     self.assertEqual(data["message"], "Bad request")

    # def test_200_create_new_user(self):
    #     res = self.client().post("/users", json = self.new_user)
    #     data = json.loads(res.data)
    #     self.assertEqual(res.status_code,200)
    #     self.assertEqual(data["success"], True)

    # def test_400_create_new_user_failure(self):
    #     # Missing required data for user creation
    #     invalid_user = {
    #         "first_name": "John",
    #         "last_name": "Doe"
    #         # Missing other required fields
    #     }

    #     res = self.client().post("/users", json=invalid_user)
    #     data = json.loads(res.data)

    #     self.assertEqual(res.status_code, 400)
    #     self.assertEqual(data["success"], False)
    #     self.assertEqual(data["message"], "Bad request")

    def test_login_success(self):
        res = self.client().post('/login', json=self.login)
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(data["success"], True)
        self.assertTrue(data["token"])


      
    
if __name__ == "__main__":
    unittest.main()    

