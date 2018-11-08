import datetime
from dateutil import parser  # pylint: disable=E0401
from sklearn.feature_extraction.text import TfidfVectorizer  # pylint: disable=E0401


import os
import sys
sys.path.append(os.path.join(os.path.dirname(__file__), './', 'utils'))
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'common'))

import mongodb_client   # pylint: disable=E0401
from cloudAMQP_client import CloudAMQPClient   # pylint: disable=E0401
import news_topic_modeling_service_client  # pylint: disable=E0401

DEDUPE_NEWS_TASK_QUEUE_URL = "amqp://dfedscrp:vDyPnfzqBTLo8f80vo7DI8RZztmOHlPG@lion.rmq.cloudamqp.com/dfedscrp"
DEDUPE_NEWS_TASK_QUEUE_NAME = "latest_news_dedupe_news_task_queue"

SLEEP_TIME_IN_SECONDS = 1

NEWS_TABLE_NAME = "news"

SAME_NEWS_SIMILARITY_THRESHOLD = 0.9

cloudAMQP_client = CloudAMQPClient(
    DEDUPE_NEWS_TASK_QUEUE_URL, DEDUPE_NEWS_TASK_QUEUE_NAME)


def handle_message(msg):
    if msg is None or not isinstance(msg, dict):
        return
    task = msg
    text = task['text']
    if text is None:
        return

    # get all recent news based on publishedAt
    published_at = parser.parse(task['publishedAt'])
    published_at_day_begin = datetime.datetime(
        published_at.year, published_at.month, published_at.day, 0, 0, 0, 0)
    published_at_day_end = published_at_day_begin + datetime.timedelta(days=1)

    db = mongodb_client.get_db()
    same_day_news_list = list(db[NEWS_TABLE_NAME].find(
        {'publishedAt': {'$gte': published_at_day_begin, '$lt': published_at_day_end}}))

    print("same_day_news_list" + str(same_day_news_list))

    if same_day_news_list is not None and len(same_day_news_list) > 0:
        print("==== in same_day_news_list ====")
        documents = [news['text'] for news in same_day_news_list]
        documents.insert(0, text)

        # Calculate similarity matrix
        tfidf = TfidfVectorizer().fit_transform(documents)
        pairwise_sim = tfidf * tfidf.T

        print(pairwise_sim)

        rows, _ = pairwise_sim.shape

        for row in range(1, rows):
            if pairwise_sim[row, 0] > SAME_NEWS_SIMILARITY_THRESHOLD:
                # Duplicated news. Ignore.
                print("Duplicated news. Ignore.")
                return

    task['publishedAt'] = parser.parse(task['publishedAt'])

    # Classify news
    title = task['title']
    if title is not None:
        topic = news_topic_modeling_service_client.classify(title)
        task['class'] = topic

    db[NEWS_TABLE_NAME].replace_one(
        {'digest': task['digest']}, task, upsert=True)


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
