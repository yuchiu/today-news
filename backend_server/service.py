from jsonrpclib.SimpleJSONRPCServer import SimpleJSONRPCServer  # pylint: disable=import-error

import os
import sys
sys.path.append(os.path.join(os.path.dirname(__file__), './', 'utils'))
import operations  # pylint: disable=import-error

SERVER_HOST = 'localhost'
SERVER_PORT = 4040


def add(num1, num2):
    """Add two numbers."""
    print("add is called with %d and %d" % (num1, num2))
    return num1 + num2


def get_one_news():
    """Get one news"""
    print("getOneNews is called")
    return operations.get_one_news()


# Threading RPC SimpleJSONRPCServer
RPC_SERVER = SimpleJSONRPCServer((SERVER_HOST, SERVER_PORT))
RPC_SERVER.register_function(add, 'add')
RPC_SERVER.register_function(get_one_news, 'getOneNews')

print("Starting RPC server on %s:%d" %
      (SERVER_HOST, SERVER_PORT))  # pylint: disable=superfluous-parens
RPC_SERVER.serve_forever()
