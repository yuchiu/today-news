import os
import sys
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'utils'))

import news_api_client as client  # pylint: disable=E0401


def test_basic():
    news = client.getNewsListFromSources()
    print(news)
    assert len(news) > 0

    news = client.getNewsListFromSources(sources=['cnn'], sortBy='top')
    assert len(news) > 0
    print('test_basic passed!')


if __name__ == '__main__':
    test_basic()
