import pyjsonrpc
import json
from bson.json_util import dumps

import os
import sys
sys.path.append(os.path.join(os.path.dirname(__file__), './', 'utils'))
import mongodb_client   # pylint: disable=E0401

SERVER_HOST = 'localhost'
SERVER_PORT = 4040


class RequestHandler(pyjsonrpc.HttpRequestHandler):
    """ Test method"""
    @pyjsonrpc.rpcmethod
    def add(self, a, b):
        print "add is called with %d and %d " % (a, b)
        return a + b

    @pyjsonrpc.rpcmethod
    def getNews(self):
        db = mongodb_client.get_db()
        news = list(db['news'].find())
        return json.loads(dumps(news))


http_server = pyjsonrpc.ThreadingHttpServer(
    server_address=(SERVER_HOST, SERVER_PORT),
    RequestHandlerClass=RequestHandler
)

print "Strarting HTTP server on %s:%d" % (SERVER_HOST, SERVER_PORT)

http_server.serve_forever()
