import os
import unittest
import json
from flaskr import create_app, db
from models import setup_db, PropertyList, Agent, db_user
class RealEstateTestCase(unittest.TestCase):
    def setUp(self):          
        self.client = self.app.test_client
        self.database_name = "realestdb_test"
        self.database_path = "postgresql://{}:{}@{}/{}".format(
            "postgres", "12345", "localhost:5432", self.database_name
        )
        setup_db(self.app, self.database_path)  
              
        with self.app.app_context():
            self.app=create_app()
            self.db.create_all()
            print('models created')


# Make the tests conveniently executable
if __name__ == "__main__":
    unittest.main()
