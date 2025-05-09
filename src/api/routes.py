"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, DiaryEntry
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from bcrypt import gensalt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from datetime import datetime
api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200


@api.route('/users', methods=['POST'])
def create_user():
    data = request.json

    required_fields = ["email", "password"]
    if not all(data.get(field) for field in required_fields):
        return jsonify({"message": "All fields are required: email, password"}), 400

    user_exists = db.session.execute(
        db.select(User).filter_by(email=data["email"])).scalar_one_or_none()
    if user_exists is not None:
        return jsonify({"message": "Can't create new user"}), 400

    password = data.get("password")
    salt = str(gensalt(), encoding='utf-8')
    password_hash = generate_password_hash(salt + password)

    user = User(
        email=data["email"],
        password=password_hash,
        salt=salt
    )

    db.session.add(user)

    try:
        db.session.commit()
    except Exception as error:
        print(error)
        db.session.rollback()
        return jsonify({"message": "Internal server error"}), 500
    return jsonify({
        "user": user.serialize()
    }), 201


@api.route('/diary', methods=['POST'])
@jwt_required()
def create_diary_entry():
    user_id = get_jwt_identity()
    user = db.session.get(User, user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404

    data = request.json
    required_fields = ["title", "content", "mood"]
    if not all(data.get(field) for field in required_fields):
        return jsonify({"message": "Missing required fields: title, content"}), 400

    new_entry = DiaryEntry(
        title=data["title"],
        content=data["content"],
        mood=data.get("mood"),
        created_at=datetime.utcnow(),
        user_id=user.id
    )

    db.session.add(new_entry)
    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        print(e)
        return jsonify({"message": "Failed to create diary entry"}), 500
    return jsonify({"message": "Diary entry created",   "entry": new_entry.serialize()}), 201


@api.route('/diary', methods=['GET'])
@jwt_required()
def get_diary_entries():
    try:
        user_id = get_jwt_identity()
        user = db.session.get(User, user_id)
        if not user:
            return jsonify({"message": "User not found"}), 404

        entries = DiaryEntry.query.filter_by(user_id=user.id).order_by(
            DiaryEntry.created_at.desc()).all()

        return jsonify({
            "entries": [
                {
                    "id": entry.id,
                    "title": entry.title,
                    "content": entry.content,
                    "mood": entry.mood,
                    "created_at": entry.created_at.isoformat() if entry.created_at else None
                }
                for entry in entries
            ]
        }), 200
    except Exception as e:
        return jsonify({"message": "Failed to fetch diary entries", "error": str(e)}), 500


@api.route('/token', methods=['POST'])
def login():
    data = request.json

    required_fields = ["email", "password"]
    if not all(data.get(field) for field in required_fields):
        return jsonify({"message": "All fields are required: email, password"}), 400

    user = db.session.execute(
        db.select(User).filter_by(email=data["email"])).scalar_one_or_none()
    if user is None:
        return jsonify({"message": "Can't login"}), 400

    salt = user.salt
    login_password = data["password"]
    password_is_valid = check_password_hash(
        user.password_hash, salt + login_password)
    if password_is_valid == False:
        return jsonify({"message": "invalid credentials"}), 400
    token = create_access_token(identity=str(user.id))
    return jsonify({"token": token}), 201
