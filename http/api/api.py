from bson import ObjectId
from flask import Flask, json, request, escape
from flask_restful import Api, Resource
from flask_pymongo import PyMongo
from marshmallow import Schema, fields
from bson.json_util import dumps

app = Flask(__name__)
app.config["MONGO_URI"] = 'mongodb://localhost:27017/geomap'
mongo = PyMongo(app)

api = Api(app)


@app.route('/filter', methods=['POST'])
def filter_energy_sources():
    # filterType = request.get_json()['filter_type']
    # filterBy = request.get_json()['filter_by']
    power = ''
    price = ''
    source_type = ''
    query = {}

    if 'power' in request.get_json():
        power = request.get_json()['power']
    if 'price' in request.get_json():
        price = request.get_json()['price']
    if 'source_type' in request.get_json():
        source_type = request.get_json()['source_type']

    if price != '' and price != '--Wszystkie--':
        if price == '10000':
            query['price'] = {'price': {"$lt": int(price)}}
        elif price == '50000':
            query['price'] = {'price': {"$lt": int(price), "$gt": 10000}}
        elif price == '300000':
            query['price'] = {'price': {"$lt": int(price), "$gt": 50000}}
        elif price == '500000':
            query['price'] = {'price': {"$lt": int(price), "$gt": 300000}}

    if power != '' and power != '--Wszystkie--':
        if power == '300':
            query['power'] = {'power': {"$lt": int(power)}}
        elif power == '700':
            query['power'] = {'power': {"$lt": int(power), "$gt": 300}}
        elif power == '2000':
            query['power'] = {'power': {"$lt": int(power), "$gt": 700}}
        elif power == '4000':
            query['power'] = {'power': {"$lt": int(power), "$gt": 2000}}
        elif power == '8000':
            query['power'] = {'power': {"$lt": int(power), "$gt": 4000}}
        elif power == '15000':
            query['power'] = {'power': {"$lt": int(power), "$gt": 8000}}
            # energy_sources.find({'$and': [
            #     {'power': {"$lt": int(power), "$gt": 8000}}
            # ]}, {'_id': 0})

    if source_type != '' and source_type != '--Wszystkie--':
        query['source_type'] = {'source_type': source_type}

    if 'source_type' not in query:
        query['source_type'] = {'source_type': {'$exists': True}}
    if 'power' not in query:
        query['power'] = {'power': {'$exists': True}}
    if 'price' not in query:
        query['price'] = {'price': {'$exists': True}}

    if 'source_type' in query or 'power' in query or 'price' in query:
        energy_sources = mongo.db.energy_sources.find(
            {
                '$and': [
                    query['source_type'],
                    query['power'],
                    query['price']
                ]
            }
            , {'_id': 0})
    else:
        energy_sources = mongo.db.energy_sources.find({}, {'_id': 0})

    return dumps(list(energy_sources))

@app.route('map_key', methods=['GET'])
def get_google_map_key():
    return 'AIzaSyDYUxRGQlsfZZ688F2p4Fq0rkU3Q4yLD78'


class EnergySourceSchema(Schema):
    source_type = fields.Str(required=True)
    name = fields.Str(required=True)
    manufacturer = fields.Str(required=True)
    model = fields.Str(required=True)
    power = fields.Integer(required=True)
    price = fields.Integer(required=True)
    assembly_data = fields.Str(required=True)
    description = fields.Str(required=True)
    photo = fields.Str(required=True)
    location = fields.Str(required=True)
    user_email = fields.Str(required=True)
    user_name = fields.Str(required=True)
    user_picture = fields.Str(required=True)
    user_phone = fields.Str(required=True)
    lat = fields.Str(required=True)
    lng = fields.Str(required=True)


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


api.add_resource(EnergySources, '/energy_sources')
api.add_resource(EnergySource, '/energy_sources/<resource_id>')

if __name__ == '__main__':
    app.run(debug=True)
