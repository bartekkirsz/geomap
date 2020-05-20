from bson import ObjectId
from flask import Flask, json, jsonify, g, request
from flask_restful import Api, Resource
from flask_pymongo import PyMongo
from bson.json_util import dumps
from marshmallow import Schema, fields

app = Flask(__name__)
app.config["MONGO_URI"] = 'mongodb://localhost:27017/geomap'
mongo = PyMongo(app)

api = Api(app)


class EnergySourceSchema(Schema):
    source_type = fields.Str(required=True)
    name = fields.Str(required=True)
    manufacturer = fields.Str(required=True)
    model = fields.Str(required=True)
    power = fields.Str(required=True)
    price = fields.Str()
    assembly_data = fields.Str(required=True)
    description = fields.Str()
    photo = fields.Str(required=True)
    location = fields.Str(required=True)
    lat = fields.Str(required=True)
    lng = fields.Str(required=True)


class UserSchema(Schema):
    mail = fields.Str(required=True)
    firstname = fields.Str(required=True)
    lastname = fields.Str()
    state = fields.Str(required=True)
    city = fields.Str(required=True)
    postal_code = fields.Str(required=True)
    street = fields.Str(required=True)
    house_number = fields.Str(required=True)
    flat_number = fields.Str()
    phone = fields.Str(required=True)
    avatar = fields.Str(required=True)


def json_response(payload, status=200):
    return json.dumps(payload), status, {'content-type': 'application/json'}


class EnergySource(Resource):
    def get(self, resource_id):
        energy_resource = mongo.db.energy_sources.find_one({'_id': ObjectId(resource_id)})
        return EnergySourceSchema().dump(energy_resource), 200

    def delete(self, resource_id):
        mongo.db.energy_sources.delete_one({'_id': ObjectId(resource_id)})
        return {'success': 'EnergySource deleted'}, 200

    def put(self, resource_id):
        mongo.db.energy_sources.update_one(
            {'_id': ObjectId(resource_id)},
            {'$set': json.loads(request.data)}
        )
        return EnergySourceSchema().dump(mongo.db.energy_sources.find_one({'_id': ObjectId(resource_id)})), 200


class EnergySources(Resource):
    def get(self):
        energy_sources = mongo.db.energy_sources.find({})
        return [EnergySourceSchema().dump(energy_source) for energy_source in energy_sources], 200

    def post(self):
        try:
            energy_source = EnergySourceSchema().load(json.loads(request.data))
            energy_source = mongo.db.energy_sources.insert_one(energy_source)
            return EnergySourceSchema().dump(mongo.db.energy_sources.find_one({'_id': energy_source.inserted_id})), 201
        except:
            return {'error': 'Cannot create EnergySource'}, 401


class Users(Resource):
    def get(self):
        users = mongo.db.users.find({})
        return [UserSchema().dump(user) for user in users], 200

    def post(self):
        try:
            user = UserSchema().load(json.loads(request.data))
            user = mongo.db.users.insert_one(user)
            return UserSchema().dump(mongo.db.users.find_one({'_id': user.inserted_id})), 201
        except:
            return {'error': 'Cannot create User'}, 401


class User(Resource):
    def get(self, user_id):
        user = mongo.db.users.find_one({'_id': ObjectId(user_id)})
        return UserSchema().dump(user), 200

    def delete(self, user_id):
        mongo.db.users.delete_one({'_id': ObjectId(user_id)})
        return {'success': 'User deleted'}, 200

    def put(self, user_id):
        mongo.db.users.update_one(
            {'_id': ObjectId(user_id)},
            {'$set': json.loads(request.data)}
        )
        return UserSchema().dump(mongo.db.users.find_one({'_id': ObjectId(user_id)})), 200


api.add_resource(EnergySources, '/energy_sources')
api.add_resource(EnergySource, '/energy_sources/<resource_id>')
api.add_resource(Users, '/users')
api.add_resource(User, '/users/<user_id>')

if __name__ == '__main__':
    app.run(debug=True)
