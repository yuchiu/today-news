import datetime
from dateutil import parser  # pylint: disable=E0401
from sklearn.feature_extraction.text import TfidfVectorizer  # pylint: disable=E0401


import os
import sys
sys.path.append(os.path.join(os.path.dirname(__file__), './', 'utils'))

import mongodb_client   # pylint: disable=E0401
from cloudAMQP_client import CloudAMQPClient   # pylint: disable=E0401

DEDUPE_NEWS_TASK_QUEUE_URL = "amqp://dfedscrp:vDyPnfzqBTLo8f80vo7DI8RZztmOHlPG@lion.rmq.cloudamqp.com/dfedscrp"
DEDUPE_NEWS_TASK_QUEUE_NAME = "latest_news_dedupe_news_task_queue"

SLEEP_TIME_IN_SECONDS = 1

NEWS_TABLE_NAME = "news-test"

SAME_NEWS_SIMILARITY_THRESHOLD = 0.9

cloudAMQP_client = CloudAMQPClient(
    DEDUPE_NEWS_TASK_QUEUE_URL, DEDUPE_NEWS_TASK_QUEUE_NAME)


def run():
    while True:
        if cloudAMQP_client is not None:
            msg = cloudAMQP_client.getMessage()
            if msg is not None:
                # Parse and process the task
                try:
                    handle_message(msg)
                except Exception as e:
                    print(e)
                    pass

            cloudAMQP_client.sleep(SLEEP_TIME_IN_SECONDS)


if __name__ == '__main__':
    run()
