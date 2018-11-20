
import requests

from json import loads

import os
import sys
from os.path import join, dirname
from dotenv import load_dotenv

dotenv_path = join(os.path.dirname(__file__), '..', '.env')
load_dotenv(dotenv_path)

API_NEWS_API_ENDPOINT = os.environ.get("API_NEWS_API_ENDPOINT")
API_NEWS_API_KEY = os.environ.get("API_NEWS_API_KEY")
API_NEWS_ARTICLES_API = os.environ.get("API_NEWS_ARTICLES_API")


CNN = 'cnn'
DEFAULT_SOURCE = [CNN]
SORT_BY_TOP = 'top'


def _buildUrl(endpoint=API_NEWS_API_ENDPOINT, apiName=API_NEWS_ARTICLES_API):
    return endpoint + apiName


def getNewsListFromSources(sources=DEFAULT_SOURCE, sortBy=SORT_BY_TOP):
    articles = []

    for source in sources:
        payload = {'apiKey': API_NEWS_API_KEY,
                   'source': source,
                   'sortBy': sortBy}
        response = requests.get(_buildUrl(), params=payload)
        res_json = loads(response.content.decode('utf-8'))

        # extract news from response
        if (res_json is not None and
            res_json['status'] == 'ok' and
                res_json['source'] is not None):
            # populate news source in each article.
            for news in res_json['articles']:
                news['source'] = res_json['source']
            articles.extend(res_json['articles'])
    return articles
