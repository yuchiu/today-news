from jsonrpclib.SimpleJSONRPCServer import SimpleJSONRPCServer  # pylint: disable=import-error
import json
import os
import sys
import operations

from os.path import join, dirname
from dotenv import load_dotenv

dotenv_path = join(os.path.dirname(__file__), '..', '.env')
load_dotenv(dotenv_path)

SERVICE_NEWS_NAME = os.environ.get("SERVICE_NEWS_NAME")
SERVICE_NEWS_HOST = os.environ.get("SERVICE_NEWS_HOST")
SERVICE_NEWS_PORT = os.environ.get("SERVICE_NEWS_PORT")

SERVICE_NEWS_PORT = 6060


def heartbeat():
    """heartbeat"""
    print("heartbeat called")
    return (json.dumps({
        "success": True,
        "config": {
            "name": SERVICE_NEWS_NAME,
            "url": SERVICE_NEWS_HOST,
            "port": SERVICE_NEWS_PORT
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
RPC_SERVER = SimpleJSONRPCServer((SERVICE_NEWS_HOST, SERVICE_NEWS_PORT))
RPC_SERVER.register_function(heartbeat, 'heartbeat')
RPC_SERVER.register_function(get_one_news, 'getOneNews')
RPC_SERVER.register_function(
    get_news_summaries_for_user, 'getNewsSummariesForUser')
RPC_SERVER.register_function(
    log_news_click_for_user, 'logNewsClickForUser')

print("Starting news RPC server on %s:%d" %
      (SERVICE_NEWS_HOST, SERVICE_NEWS_PORT))  # pylint: disable=superfluous-parens
RPC_SERVER.serve_forever()
