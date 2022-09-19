import os
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
import json
from flask_migrate import Migrate
import sys

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:12345@localhost:5432/realestdb'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

"""
migration
"""
migrate = Migrate(app, db)

class Property(db.Model):
    __tablename__ = 'property'
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String())
    amount = db.Column(db.Integer)
    location = db.Column(db.String())
    bed = db.Column(db.Integer)
    bath = db.Column(db.Integer)
    toilet = db.Column(db.Integer)
    action = db.Column(db.String())
    status = db.Column(db.String())

    def __repr__(self):
        return f'<Property {self.id} {self.description} {self.amount} {self.location} {self.bed} {self.bath} {self.toilet} \
            {self.action} {self.status}>'

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

    def __repr__(self):
        return f'<{self.id} {self.first_name} {self.last_name} \
            {self.business_name} {self.e_mail} {self.pword} {self.tel}\
                 {self.agent_call_number} {self.whatsapp} {self.business_web}>' 

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String())
    last_name = db.Column(db.String())    
    email = db.Column(db.String())
    pword = db.Column(db.String())
    tel = db.Column(db.String())
    
    def __repr__(self):
        return f'<{self.id} {self.first_name} {self.last_name} \
            {self.e_mail} {self.pword} {self.tel}>' 


@app.route('/')
def check():
    return jsonify({
        'text':'okay'
    })