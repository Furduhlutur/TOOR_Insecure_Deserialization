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

#  -------
# |HELPERS|
#  -------
def rows_to_dict(rows):
    return [dict(row) for row in rows]


#  ---------------------
# |DEFINITION OF A TOKEN|
#  ---------------------
class Token(object):
    def __init__(self, id, name, time, password):
        self.id = id
        self.name = name
        self.time = time
        self.password = password


#  -------------
# |ERROR HANDLER|
#  -------------
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
    return response


#  --------------
# |AUTHENTICATION|
#  --------------
def check_auth(token):
    db = get_db()
    user = pickle.loads(base64.b64decode(token))
    user_vals = db.execute(
                "SELECT username, password FROM user WHERE id = ?", (user.id,)
            ).fetchone()
    return user.name == user_vals[0] and user.password == user_vals[1]

def check_admin(token):
    db = get_db()
    admin = pickle.loads(base64.b64decode(token))
    admin_vals = db.execute(
                 "SELECT username, password FROM user WHERE username = 'admin'"
                 ).fetchone()
    return admin.name == "admin" and admin.password == admin_vals[1]

def authenticate(message):
    message = {"error": message}
    response = jsonify(message)
    response.status_code = 401
    return response

def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.cookies.get('token')
        if not token:
            return authenticate("Please login")

        elif not check_auth(token):
            return authenticate("Invalid token")
        return f(*args, **kwargs)
    return decorated

def requires_admin(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.cookies.get('token')
        if not token:
            return authenticate("Requires admin rights")

        elif not check_admin(token):
            return authenticate("Invalid admin token")
        return f(*args, **kwargs)
    return decorated


#  ---------
# |ENDPOINTS|
#  ---------
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
        token = base64.b64encode(pickle.dumps(Token(user[0], username, datetime.now(), user[2])))
        response = jsonify({"username": username})
        response.set_cookie('token', token)
        response.headers['Access-Control-Allow-Credentials'] = "true"
        return response
    raise Error(error)

@bp.route('/user', methods=['GET'])
@requires_auth
def user_list():
    db = get_db()
    users = rows_to_dict(db.execute("SELECT id, username FROM user").fetchall())
    response = jsonify(users)
    response.headers['Access-Control-Allow-Credentials'] = "true"
    return response

@bp.route('/user/<id>', methods=['GET', 'DELETE'])
@requires_auth
def user_detail(id):
    db = get_db()
    user = db.execute("SELECT username FROM user WHERE id = ?", (id,)).fetchone()

    if user is None:
        raise Error("No user with that ID", status_code=404)

    if request.method == 'DELETE':
        db.execute("DELETE FROM user WHERE id = ?", (id,))
        db.commit()
    response = jsonify(dict(user))
    response.headers['Access-Control-Allow-Credentials'] = "true"
    return response

@bp.route('/post', methods=['POST'])
# @requires_admin
def post_create():
    body = request.form['body']
    title = request.form['title']
    author = request.form['author_id']
    error = None

    if not title:
        error = "Title is required."
    elif not body:
        error = "Content is required."

    if error is None:
        db = get_db()
        db.execute(
                "INSERT INTO post (title, body, author_id) VALUES (?, ?, ?)",
                (title, body, author)
                )
        db.commit()
        response = make_response("Created", 201)
        response.headers['Access-Control-Allow-Credentials'] = "true"
        return response
    raise Error(error, status_code=400)

@bp.route('/post', methods=['GET'])
# @requires_auth
def post_list():
    db = get_db()
    posts = db.execute(
            "SELECT p.id, title, body, created, author_id, username"
            " FROM post p JOIN user u ON p.author_id = u.id"
            " ORDER BY created DESC"
            ).fetchall()
    response = jsonify(rows_to_dict(posts))
    response.headers['Access-Control-Allow-Credentials'] = "true"
    return response

@bp.route('/post/<id>', methods=['GET', 'DELETE'])
# @requires_admin
def post_detail(id):
    db = get_db()
    post = db.execute(
            "SELECT p.id, title, body, created, author_id, username"
            " FROM post p JOIN user u ON p.author_id = u.id"
            " WHERE p.id = ?",
            (id,)
            ).fetchone()

    if post is None:
        raise Error("No post with that ID", status_code=404)

    if request.method == 'DELETE':
        db.execute("DELETE FROM post WHERE id = ?", (id,))
        db.commit()
    response = jsonify(dict(post))
    response.headers['Access-Control-Allow-Credentials'] = "true"
    return response

@bp.route('/comment', methods=['POST'])
@requires_auth
def comment_create():
    body = request.form['body']
    post = request.form['post_id']
    author = request.form['author_id']
    error = None

    if not body:
        error = "Content is required."

    if error is None:
        db = get_db()
        db.execute(
                "INSERT INTO comment (body, author_id, post_id) VALUES (?, ?, ?)",
                (body, author, post)
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

@bp.route('/comment/<id>', methods=['GET', 'DELETE'])
@requires_auth
def comment_detail(id):
    db = get_db()
    comment = db.execute(
              "SELECT c.id, post_id, c.author_id, c.created, c.body, username"
              " FROM comment c JOIN post p ON c.post_id = p.id"
              " JOIN user u ON c.author_id = u.id"
              " WHERE c.id = ?",
              (id,)
              ).fetchone()

    if comment is None:
        raise Error("No comment with that ID", status_code=404)

    if request.method == 'DELETE':
        db.execute("DELETE FROM comment WHERE id = ?", (id,))
        db.commit()
    response = jsonify(dict(comment))
    response.headers['Access-Control-Allow-Credentials'] = "true"
    return response

