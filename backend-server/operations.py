import json
import os
import pickle
import redis
import sys

from bson.json_util import dumps
from datetime import datetime

# import common package in parent directory
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'common'))

import mongodb_client
import news_recommendation_service_client

from cloudAMQP_client import CloudAMQPClient

NEWS_LIST_BATCH_SIZE = 10
NEWS_LIMIT = 200
USER_NEWS_TIME_OUT_IN_SECONDS = 60

NEWS_TABLE_NAME = "news"

REDIS_HOST = "localhost"
REDIS_PORT = 6379

redis_client = redis.StrictRedis(REDIS_HOST, REDIS_PORT, db=0)


LOG_CLICKS_TASK_QUEUE_URL = "amqp://lfwogwnt:NNagiowONx8Yh2sVeDZ481fBXllQfu4z@wombat.rmq.cloudamqp.com/lfwogwnt"
LOG_CLICKS_TASK_QUEUE_NAME = "tap-news-log-clicks-task-queue"
cloudAMQP_client = CloudAMQPClient(
    LOG_CLICKS_TASK_QUEUE_URL, LOG_CLICKS_TASK_QUEUE_NAME)


def getOneNews():
    db = mongodb_client.get_db()
    news = db[NEWS_TABLE_NAME].find_one()
    return news
