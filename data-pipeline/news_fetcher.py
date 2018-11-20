# -*- coding: utf-8 -*-

import os
import sys

from newspaper import Article  # pylint: disable=E0401

sys.path.append(os.path.join(os.path.dirname(__file__), '.', 'scrapers'))
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'common'))


from cloudAMQP_client import CloudAMQPClient  # pylint: disable=E0401

from os.path import join, dirname
from dotenv import load_dotenv

dotenv_path = join(os.path.dirname(__file__), '..', '.env')
load_dotenv(dotenv_path)

MQ_SCRAPE_NEWS_QUEUE_HOST = os.environ.get("MQ_SCRAPE_NEWS_QUEUE_HOST")
MQ_SCRAPE_NEWS_QUEUE_NAME = os.environ.get("MQ_SCRAPE_NEWS_QUEUE_NAME")

MQ_DEDUPE_NEWS_QUEUE_HOST = os.environ.get("MQ_DEDUPE_NEWS_QUEUE_HOST")
MQ_DEDUPE_NEWS_QUEUE_NAME = os.environ.get("MQ_DEDUPE_NEWS_QUEUE_NAME")

SLEEP_TIME_IN_SECONDS = 5

dedupe_news_queue_client = CloudAMQPClient(
    MQ_DEDUPE_NEWS_QUEUE_HOST, MQ_DEDUPE_NEWS_QUEUE_NAME)
scrape_news_queue_client = CloudAMQPClient(
    MQ_SCRAPE_NEWS_QUEUE_HOST, MQ_SCRAPE_NEWS_QUEUE_NAME)


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
