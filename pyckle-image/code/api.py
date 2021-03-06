import pickle
import base64
from datetime import datetime
from functools import wraps

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for, Response, jsonify,
    make_response
)
from werkzeug.security import check_password_hash, generate_password_hash

from Api.db import get_db

bp = Blueprint('api', __name__, url_prefix='/api')

def rows_to_dict(rows):
    return [dict(row) for row in rows]


class Token(object):
    def __init__(self, id, name, time, password):
        self.id = id
        self.name = name
        self.time = time
        self.password = password


class Error(Exception):
    status_code = 400

    def __init__(self, error, status_code=None, payload=None):
        Exception.__init__(self)
        self.error = error
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        response = dict(self.payload or ())
        response["error"] = self.error
        return response

@bp.errorhandler(Error)
def handle_error(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    response.headers['Access-Control-Allow-Credentials'] = "true"
    return response


#/// LIVE CODE
def check_auth(token):
    db = get_db()
    user = pickle.loads(base64.b64decode(token))
    try:
        user_vals = db.execute(
                    "SELECT username, password FROM user WHERE id = ?", (user.id,)
                ).fetchone()
    except Exception as e:
        return (False, f"Invalid token, the object {user} is invalid.")
    return (user.name == user_vals[0] and user.password == user_vals[1], "Invalid token.")

def authenticate(message):
    message = {"error": message}
    response = jsonify(message)
    response.headers['Access-Control-Allow-Credentials'] = "true"
    response.status_code = 401
    return response

def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.cookies.get('token')
        if not token:
            return authenticate("Please login")

        auth_vals = check_auth(token)
        if not auth_vals[0]:
            return authenticate(auth_vals[1])
        return f(*args, **kwargs)
    return decorated
#/// END LIVE CODE


@bp.route('/register', methods=['POST'])
def register():
    username = request.form['username']
    password = request.form['password']
    db = get_db()
    error = None
    
    if not username:
        error = "Username is required."
    elif not password:
        error = "Password is required."
    elif db.execute("SELECT id FROM user WHERE username = ?", (username,)).fetchone() is not None:
        error = f"{username} is already registered."

    if error is None:
        db.execute("INSERT INTO user (username, password) VALUES (?, ?)",
                   (username, generate_password_hash(password))
        )
        db.commit()
        response = make_response("Created", 201)
        response.headers['Access-Control-Allow-Credentials'] = "true"
        return response
    raise Error(error)

#/// LIVE CODE
@bp.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']
    db = get_db()
    error = None

    user = db.execute(
            "SELECT * FROM user WHERE username = ?", (username,)
           ).fetchone()
    if user is None or not check_password_hash(user['password'], password):
        error = "Incorrect username or password."

    if error is None:
        token = base64.b64encode(pickle.dumps(Token(user['id'], username,
                                                    datetime.now(), user['password'])))
        response = jsonify({"username": username})
        response.set_cookie('token', token)
        response.headers['Access-Control-Allow-Credentials'] = "true"
        return response
    raise Error(error)
#/// END LIVE CODE

@bp.route('/comment', methods=['POST'])
@requires_auth
def comment_create():
    body = request.form['body']
    post = request.form['post_id']
    author = request.form['username']
    error = None

    if not body:
        error = "Content is required."

    if error is None:
        db = get_db()
        author_id = db.execute("SELECT id FROM user WHERE username = ?", (author,)).fetchone()[0]
        db.execute(
                "INSERT INTO comment (body, author_id, post_id) VALUES (?, ?, ?)",
                (body, author_id, post)
                )
        db.commit()
        comment_id = db.execute("SELECT max(id) FROM comment").fetchone()[0]
        return comment_detail(comment_id)
    raise Error(error, status_code=400)

@bp.route('/comment', methods=['GET'])
@requires_auth
def comment_list():
    db = get_db()
    if "post_id" in request.args:
        comments = db.execute(
                   "SELECT c.id, post_id, c.author_id, c.created, c.body, username"
                   " FROM comment c JOIN user u ON c.author_id = u.id"
                   " WHERE post_id = ?"
                   " ORDER BY c.created ASC",
                   (request.args['post_id'],)
                   ).fetchall()
    else:
        comments = db.execute(
                   "SELECT c.id, post_id, c.author_id, c.created, c.body, username"
                   " FROM comment c JOIN user u ON c.author_id = u.id"
                   " ORDER BY c.created ASC"
                   ).fetchall()
    response = jsonify(rows_to_dict(comments))
    response.headers['Access-Control-Allow-Credentials'] = "true"
    return response

