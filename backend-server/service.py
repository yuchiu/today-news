from jsonrpclib.SimpleJSONRPCServer import SimpleJSONRPCServer  # pylint: disable=import-error

import os
import sys
sys.path.append(os.path.join(os.path.dirname(__file__), './', 'utils'))
import operations  # pylint: disable=import-error

SERVER_HOST = 'localhost'
SERVER_PORT = 4040


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
RPC_SERVER.register_function(get_one_news, 'getOneNews')
RPC_SERVER.register_function(
    get_news_summaries_for_user, 'getNewsSummariesForUser')
RPC_SERVER.register_function(
    log_news_click_for_user, 'logNewsClickForUser')

print("Starting RPC server on %s:%d" %
      (SERVER_HOST, SERVER_PORT))  # pylint: disable=superfluous-parens
RPC_SERVER.serve_forever()
