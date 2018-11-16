from jsonrpclib.SimpleJSONRPCServer import SimpleJSONRPCServer  # pylint: disable=import-error
import json
import os
import sys
import operations

NAME = 'news-service'
ENV = 'development'
SERVER_HOST = 'localhost'
SERVER_PORT = 6060


def heartbeat():
    """heartbeat"""
    print("heartbeat called")
    return (json.dumps({
        "success": True,
        "config": {
            "name": NAME,
            "url": SERVER_HOST,
            "port": SERVER_PORT
        }
    }))


def get_one_news():
    """getOneNews"""
    print("getOneNews is called")
    return operations.get_one_news()


def get_news_summaries_for_user(user_id, page_num):
    """getNewsSummariesForUser"""
    print("getNewsSummariesForUser is called")
    return operations.getNewsSummariesForUser(user_id, page_num)


def log_news_click_for_user(user_id, news_id):
    """logNewsClickForUser"""
    print("log_news_click_for_user is called with %s and %s" %
          (user_id, news_id))
    operations.logNewsClickForUser(user_id, news_id)


# Threading RPC SimpleJSONRPCServer
RPC_SERVER = SimpleJSONRPCServer((SERVER_HOST, SERVER_PORT))
RPC_SERVER.register_function(heartbeat, 'heartbeat')
RPC_SERVER.register_function(get_one_news, 'getOneNews')
RPC_SERVER.register_function(
    get_news_summaries_for_user, 'getNewsSummariesForUser')
RPC_SERVER.register_function(
    log_news_click_for_user, 'logNewsClickForUser')

print("Starting backend RPC server on %s:%d" %
      (SERVER_HOST, SERVER_PORT))  # pylint: disable=superfluous-parens
RPC_SERVER.serve_forever()
