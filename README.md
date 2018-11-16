# Usage

## Tech Stack

### Client Side

    Reactjs ∙ React Native ∙ Redux ∙ React-Redux ∙ React-Router ∙ Redux-Thunk ∙ Axios

### Server Side

    Python ∙ Nodejs ∙ Expressjs ∙ RPC API ∙ Redis ∙ RabbitMQ ∙ ElasticSearch ∙ MongoDB ∙ Mongoose ∙
    Web Scraper ∙ Tensorflow ∙ Docker

---

## Tools & Softwares

### required tools & version this project is using

| Tools    | Versions        |
| -------- | --------------- |
| npm      | 6.1.0           |
| pip3     | 9.0.1           |
| nodejs   | 10.7.0          |
| python3  | 3.6.5           |
| mongodb  | 3.6             |
| Redis    | 4.0.11          |
| rabbitmq | using CloudAMQP |

### Optional tools & version this project is using

| Tools                    | Versions   |
| ------------------------ | ---------- |
| **For Mobile Client**    |
| react-native             | 0.57.5     |
| react-native-cli         | 2.0.1      |
| **For Production Build** |
| docker                   | 18.06.1-ce |
| docker-compose           | 1.22.0     |

default redis port: 6379
default mongodb port: 27017

## Development

### Building Data Warehouse

#### News Data Pipeline

- monitor recent published news from News API, send the tasks to a channel of message queue

```terminal
pip3 install -r requirements.txt
python3 news_monitor.py
```

- scrape news from tasks send by news_monitor, send the fetched news to another channel of queue for deduper

```terminal
pip3 install -r requirements.txt
python3 news_fetcher.py
```

- dedupe fetched news by news_fetcher, use TF-IDF to remove duplicate news, use news topic modeling service to classify news, then store the clean dataset(news) in MongoDB.(News could be saved in DB without topic modeling, the data can be backfill in later process using news topic modeling service)

```terminal
pip3 install -r requirements.txt
python3 news_deduper.py
```

#### News Topic Modeling Service

- launch news classifier trainer to create topic model

```terminal
pip3 install -r requirements.txt
cd trainer
python3 news_classify_trainer.py
```

- start topic modeling service for news pipeline to classify new data

```terminal
pip3 install -r requirements.txt
cd server
python3 topic_modeling_service.py
```

- backfilling data that were stored in database that were populated without topic model, start topic_modeling_service.py before backfilling

```terminal
pip3 install -r requirements.txt
python3 backfill.py
```

Application will be serving on http://localhost:8080

#### Preference Log Processor

- launch click log processor pipeline that process user's preference based on his/her clicks on news using time decay model and store user's preference in DB

```terminal
pip3 install -r requirements.txt
python3 preference_log_processor.py
```

### Serving Application

#### News Recommendation Service

- install dependencies & start news recommendation service

```terminal
pip3 install -r requirements.txt
python3 recommendation.py
```

Application will be serving on http://localhost:7070

#### News Service

- install dependencies & start news service

```terminal
pip3 install -r requirements.txt
python3 service.py
```

Application will be serving on http://localhost:6060

#### Search Service

- install dependencies & start search service

```terminal
npm install
npm start
```

Application will be serving on http://localhost:5050

#### User Service

- install dependencies & start user service

```terminal
npm install
npm start
```

Application will be serving on http://localhost:4040

#### Web Server

- install dependencies & start application

```terminal
npm install
npm start
```

Application will be serving on http://localhost:3030

#### Monitoring Service (Optional)

- install dependencies & start application

```terminal
npm install
npm start
```

This service will be monitoring all other services **except** for Web Server and services that runs in async pipeline, i.e Topic Modeling Service.

#### Web Client

- install dependencies & start application

```terminal
npm install
npm start
```

Application will be serving on http://localhost:3000

#### Mobile Client(Android)

- start Android emulator
- cd into directory, install dependencies & start application

```terminal
npm install
react-native run-android
```

Application will be running on Android Emulator  
Geting started with React Native documentation [Link](https://facebook.github.io/react-native/docs/getting-started).
