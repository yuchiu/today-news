import os
import sys
sys.path.append(os.path.join(os.path.dirname(__file__), '../', 'scrapers'))

import cnn_scraper as scraper  # pylint: disable=E0401

EXPECTED_STRING = "the man charged with killing five people at the Fort Lauderdale airport"
CNN_NEWS_URL = "http://edition.cnn.com/2017/01/17/us/fort-lauderdale-shooter-isis-claim/index.html"


def test_basic():
    news = scraper.extract_news(CNN_NEWS_URL)

    assert EXPECTED_STRING in news
    print news
    print 'test_basic passed!'


if __name__ == "__main__":
    test_basic()
