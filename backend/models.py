import os
from sqlalchemy import Column, ForeignKey, String, Integer, create_engine
from flask_sqlalchemy import SQLAlchemy
import json
from flask_migrate import Migrate
# from flaskr import db

db_host = os.getenv('localhost', '127.0.0.1:5432')
db_user = os.getenv('DB_USER', 'postgres')
db_pword = os.getenv('DB_PASSWORD','12345')
db_name = 'realestdb'
database_path = 'postgresql+psycopg2://{}:{}@{}/{}'.format(
    db_user,db_pword, db_host, db_name
)

db = SQLAlchemy()

def setup_db(app, database_path=database_path):
    app.config["SQLALCHEMY_DATABASE_URI"]=database_path
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.app = app
    db.init_app(app)
    # db.create_all()
    Migrate(app,db)

    # with app.app_context():
    #     db.drop_all()
    #     db.create_all()

from models_classes import PropertyList, User, Agent

