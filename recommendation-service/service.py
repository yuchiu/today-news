import operator
import os
import json
import sys

from jsonrpclib.SimpleJSONRPCServer import SimpleJSONRPCServer

# import config package in parent directory
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'common'))

import mongodb_client  # pylint: disable=E0401

from os.path import join, dirname
from dotenv import load_dotenv

dotenv_path = join(os.path.dirname(__file__), '..', '.env')
load_dotenv(dotenv_path)

DB_PREFERENCE_MODEL_TABLE_NAME = os.environ.get(
    "DB_PREFERENCE_MODEL_TABLE_NAME")
SERVICE_RECOMMENDATION_NAME = os.environ.get("SERVICE_RECOMMENDATION_NAME")
SERVICE_RECOMMENDATION_HOST = os.environ.get("SERVICE_RECOMMENDATION_HOST")
SERVICE_RECOMMENDATION_PORT = os.environ.get("SERVICE_RECOMMENDATION_PORT")


def heartbeat():
    """heartbeat"""
    print("heartbeat called")
    return (json.dumps({
        "success": True,
        "config": {
            "name": SERVICE_RECOMMENDATION_NAME,
            "url": SERVICE_RECOMMENDATION_HOST,
            "port": SERVICE_RECOMMENDATION_PORT
        }
    }))


def isclose(a, b, rel_tol=1e-09, abs_tol=0.0):
    return abs(a-b) <= max(rel_tol * max(abs(a), abs(b)), abs_tol)


def getPreferenceForUser(user_id):
    """ Get user's pereference in an ordered class list """
    db = mongodb_client.get_db()
    model = db[DB_PREFERENCE_MODEL_TABLE_NAME].find_one({'userId': user_id})

    if model is None:
        return []

    sorted_tuples = sorted(
        list(model['preference'].items()), key=operator.itemgetter(1), reverse=True)
    sorted_list = [x[0] for x in sorted_tuples]
    sorted_value_list = [x[1] for x in sorted_tuples]

    if isclose(float(sorted_value_list[0]), float(sorted_value_list[-1])):
        return []

    return sorted_list


# Threading HTTP Server
RPC_SERVER = SimpleJSONRPCServer(
    (SERVICE_RECOMMENDATION_HOST, SERVICE_RECOMMENDATION_PORT))
RPC_SERVER.register_function(heartbeat, 'heartbeat')
RPC_SERVER.register_function(getPreferenceForUser, 'getPreferenceForUser')

print("Starting news-recommendation-service HTTP server on %s:%d" %
      (SERVICE_RECOMMENDATION_HOST, SERVICE_RECOMMENDATION_PORT))

RPC_SERVER.serve_forever()
