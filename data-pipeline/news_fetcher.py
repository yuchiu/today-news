# -*- coding: utf-8 -*-

import os
import sys

from newspaper import Article  # pylint: disable=E0401

sys.path.append(os.path.join(os.path.dirname(__file__), './', 'utils'))
sys.path.append(os.path.join(os.path.dirname(__file__), './', 'scrapers'))
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'common'))


from cloudAMQP_client import CloudAMQPClient  # pylint: disable=E0401


SCRAPE_NEWS_TASK_QUEUE_URL = "amqp://rutjjghd:azj53edQjx1lCSpICxmnKrhc0cE9OFOW@lion.rmq.cloudamqp.com/rutjjghd"
SCRAPE_NEWS_TASK_QUEUE_NAME = 'latest_news_scrape_news_task_queue'
DEDUPE_NEWS_TASK_QUEUE_URL = "amqp://dfedscrp:vDyPnfzqBTLo8f80vo7DI8RZztmOHlPG@lion.rmq.cloudamqp.com/dfedscrp"
DEDUPE_NEWS_TASK_QUEUE_NAME = "latest_news_dedupe_news_task_queue"

SLEEP_TIME_IN_SECONDS = 5

dedupe_news_queue_client = CloudAMQPClient(
    DEDUPE_NEWS_TASK_QUEUE_URL, DEDUPE_NEWS_TASK_QUEUE_NAME)
scrape_news_queue_client = CloudAMQPClient(
    SCRAPE_NEWS_TASK_QUEUE_URL, SCRAPE_NEWS_TASK_QUEUE_NAME)


def handle_message(msg):
    if msg is None or not isinstance(msg, dict):
        print('message is broken')
        return

    task = msg
    text = None

    article = Article(task['url'])
    article.download()
    article.parse()

    task['text'] = article.text
    dedupe_news_queue_client.sendMessage(task)


def run():
    while True:
        if scrape_news_queue_client is not None:
            msg = scrape_news_queue_client.getMessage()
            if msg is not None:
                # parse and process the task
                try:
                    handle_message(msg)
                except Exception as e:
                    print(e)
                    pass
            scrape_news_queue_client.sleep(SLEEP_TIME_IN_SECONDS)


if __name__ == "__main__":
    run()
