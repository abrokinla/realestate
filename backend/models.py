import os
from sqlalchemy import Column, ForeignKey, String, Integer, create_engine
from flask_sqlalchemy import SQLAlchemy
import json
from flask_migrate import Migrate

db_host = os.getenv('localhost', '127.0.0.1:5432')
db_user = os.getenv('DB_USER', 'postgres')
db_pword = os.getenv('DB_PASSWORD','12345')
db_name = 'realestdb'
database_path = 'postgresql+psycopg2://{}:{}@{}/{}'.format(db_user,db_pword, db_host, db_name)

db = SQLAlchemy()

def setup_db(app, database_path=database_path):
    app.config["SQLALCHEMY_DATABASE_URI"]=database_path
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.app = app
    db.init_app(app)
    Migrate(app,db)


 # ...............Models start.................
class PropertyList(db.Model):
    __tablename__ = 'propertylist'
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String())
    amount = db.Column(db.Integer)
    location = db.Column(db.String())
    bed = db.Column(db.Integer)
    bath = db.Column(db.Integer)
    toilet = db.Column(db.Integer)
    action = db.Column(db.String())#For sale or rent
    status = db.Column(db.String())
    rating = db.Column(db.Integer)
    img_url = db.Column(db.String())
    agent_id = db.Column(db.Integer, db.ForeignKey('agent.id'), nullable=False)

    def __repr__(self):
        return f'<Property {self.id} {self.description} {self.amount} {self.location} {self.bed} {self.bath} {self.toilet} \
            {self.action} {self.status} {self.rating} {self.img_url}>'
    
    def insert(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def format(self):
        return {
            'id':self.id,
            'description':self.description,
            'amount':self.amount,
            'location':self.location,
            'bed':self.bed,
            'bath':self.bath,
            'toilet':self.toilet,
            'action':self.action,
            'status':self.status,
            'rating':self.rating,
            'img_url': self.img_url,
        }
        

class Agent(db.Model):
    __tablename__ = 'agent'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String())
    last_name = db.Column(db.String())
    business_name = db.Column(db.String())
    email = db.Column(db.String())
    pword = db.Column(db.String())
    tel = db.Column(db.String())
    agent_call_number = db.Column(db.String())
    whatsapp = db.Column(db.String())
    business_web = db.Column(db.String())
    user_role = db.Column(db.String())
    is_admin = db.Column(db.Boolean, default=False, nullable=False)
    properties= db.relationship('PropertyList', backref = 'list', lazy=True)

    def __repr__(self):
        return f'<{self.id} {self.first_name} {self.last_name} \
            {self.business_name} {self.e_mail} {self.pword} {self.tel}\
                {self.agent_call_number} {self.whatsapp} {self.business_web} {self.user_role} \
                    {self.is_admin}>' 

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def format(self):
        return {
            'id':self.id,
            'first_name':self.first_name,
            'last_name':self.last_name,
            'business_name':self.business_name,
            'email':self.email,
            'pword':self.pword,
            'tel':self.tel,
            'agent_call_number':self.agent_call_number,
            'whatsapp':self.whatsapp,
            'business_web':self.business_web,
            'user_role':self.user_role,
            'is_admin':self.is_admin
        }

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String())
    last_name = db.Column(db.String())    
    email = db.Column(db.String())
    pword = db.Column(db.String())
    tel = db.Column(db.String())
    user_role = db.Column(db.String())
    
    def __repr__(self):
        return f'<{self.id} {self.first_name} {self.last_name} \
            {self.e_mail} {self.pword} {self.tel} {self.user_role}>' 
    
    def insert(self):
        db.session.add(self)
        db.session.commit()

    def format(self):
        return {
            'id':self.id,
            'first_name':self.first_name,
            'last_name':self.last_name,
            'email':self.email,
            'pword':self.pword,
            'tel':self.tel,
            'user_role':self.user_role
        }
    # ......................Models end...........

