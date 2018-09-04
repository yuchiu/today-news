import json
import os
import sys
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'common'))
import operations  # pylint: disable=import-error

from bson.json_util import dumps  # pylint: disable=import-error
from jsonrpclib.SimpleJSONRPCServer import SimpleJSONRPCServer  # pylint: disable=import-error

SERVER_HOST = 'localhost'
SERVER_PORT = 4040


def add(num1, num2):
    """Add two numbers."""
    print("add is called with %d and %d" % (num1, num2))
    return num1 + num2


def get_one_news():
    """ Get one news. """
    print("getOneNews is called")
    return json.loads(dumps(operations.getOneNews()))


def get_news_summaries_for_user(user_id, page_num):
    """ Get news summaries for a user. """
    print("get_news_summaries_for_user is called with %s and %s" %
          (user_id, page_num))
    return operations.getNewsSummariesForUser(user_id, page_num)


# Threading RPC SimpleJSONRPCServer
RPC_SERVER = SimpleJSONRPCServer((SERVER_HOST, SERVER_PORT))
RPC_SERVER.register_function(add, 'add')
RPC_SERVER.register_function(get_one_news, 'getOneNews')
RPC_SERVER.register_function(
    get_news_summaries_for_user, 'getNewsSummariesForUser')

print("Starting RPC server on %s:%d" %
      (SERVER_HOST, SERVER_PORT))  # pylint: disable=superfluous-parens
RPC_SERVER.serve_forever()
