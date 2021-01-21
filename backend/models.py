from backend import db
from passlib.hash import pbkdf2_sha256 as sha256
from datetime import datetime
from sqlalchemy import desc


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(30), unique=True, nullable=False)
    password = db.Column(db.String(30), nullable=False)

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def find_by_username(cls, username):
        return cls.query.filter_by(username=username).first()

    @staticmethod
    def generate_hash(password):
        return sha256.hash(password)

    @staticmethod
    def verify_hash(password, pass_hash):
        return sha256.verify(password, pass_hash)


class Audit(db.Model):
    __tablename__ = 'audits'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(30), nullable=False)
    last_login = db.Column(db.DateTime, default=datetime.utcnow)

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
    
    @classmethod
    def get_all(cls):
        def to_json(x):
            return {
                'username': x.username,
                'last_login': str(x.last_login.strftime('%d-%m-%Y %H:%M:%S'))
            }
        return {'users': list(map(lambda x: to_json(x), Audit.query.order_by(desc(Audit.last_login)).all()))}
