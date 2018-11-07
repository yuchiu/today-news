import json
import os
import sys
import redis
from datetime import datetime
import pickle  # convert dictionary or json into string that redis can process

from bson.json_util import dumps  # pylint: disable=E0401

sys.path.append(os.path.join(os.path.dirname(__file__), '../', 'utils'))
import mongodb_client  # pylint: disable=E0401
from cloudAMQP_client import CloudAMQPClient   # pylint: disable=E0401


REDIS_HOST = "localhost"
REDIS_PORT = 6379

NEWS_TABLE_NAME = "news"

USER_NEWS_TIME_OUT_IN_SECONDS = 300
NEWS_LIST_BATCH_SIZE = 10
NEWS_LIMIT = 100


redis_client = redis.StrictRedis(REDIS_HOST, REDIS_PORT, db=0)

CLICK_LOG_TASK_QUEUE_URL = 'amqp://lnmofzhd:04BvbnZTToWYf2aLkKSNNryw4rX7lWfs@toad.rmq.cloudamqp.com/lnmofzhd'
CLICK_LOG_TASK_QUEUE_NAME = 'preference-click-log-task-queue'
cloudAMQP_client = CloudAMQPClient(
    CLICK_LOG_TASK_QUEUE_URL, CLICK_LOG_TASK_QUEUE_NAME)


def get_one_news():
    """Get one news"""
    res = mongodb_client.get_db()['news'].find_one()
    return json.loads(dumps(res))


def logNewsClickForUser(user_id, news_id):
    # Send log task to machine learning service for prediction
    message = {'userId': user_id, 'newsId': news_id,
               'timestamp': str(datetime.utcnow())}
    cloudAMQP_client.sendMessage(message)


def getNewsSummariesForUser(user_id, page_num):
    page_num = int(page_num)
    begin_index = (page_num - 1) * NEWS_LIST_BATCH_SIZE
    end_index = page_num * NEWS_LIST_BATCH_SIZE

    sliced_news = []

    if redis_client.get(user_id) is not None:
        total_news_digests = pickle.loads(redis_client.get(user_id))

        # If begin_index is out of range, this will return empty list;
        # If end_index is out of range (begin_index is within the range), this
        # will return all remaining news ids.
        sliced_news_digests = total_news_digests[begin_index:end_index]
        db = mongodb_client.get_db()
        sliced_news = list(db[NEWS_TABLE_NAME].find(
            {'digest': {'$in': sliced_news_digests}}))
    else:
        db = mongodb_client.get_db()
        total_news = list(db[NEWS_TABLE_NAME].find().sort(
            [('publishedAt', -1)]).limit(NEWS_LIMIT))
        total_news_digests = [x['digest'] for x in total_news]

        redis_client.set(user_id, pickle.dumps(total_news_digests))
        redis_client.expire(user_id, USER_NEWS_TIME_OUT_IN_SECONDS)

        sliced_news = total_news[begin_index: end_index]

    for news in sliced_news:
        # Remove text field to save bandwidth.
        del news['text']
        if news['publishedAt'].date() == datetime.today().date():
            news['time'] = 'today'
    return json.loads(dumps(sliced_news))
