# Today News

## Quick Link

[Demo](#demo)

- [Live Site Demo](#live-site-demo)
- [Video Demo](#video-demo)

[Tech Stack](#tech-stack)

- [Client Side](#client-side)
- [Server Side](#server-side)

[System Architecture Diagram](#system-architecture-diagram)

[Tools & Softwares](#tools-&-softwares)

- [Operating System & version](#operating-system-this-project-is-using-during-development)
- [Required tools & version](#required-tools-&-version-this-project-is-using)
- [Optional tools & version](#optional-tools-&-version-this-project-is-using)

[Development Environment](#development-environment)

- [Building Data Warehouse](#building-data-warehouse)

  - [News Data Pipeline](#news-data-pipeline)
  - [News Topic Modeling Service](#news-topic-modeling-service)

- [Serving Application](#serving-application)

  - [Preference Log Process Service](<#preference-log-process-service(optional)>)
  - [News Recommendation Service](#news-recommendation-service)
  - [News Service](#news-service)
  - [Search Service](#search-service)
  - [User Service](#user-service)
  - [Web Server](#web-server)
  - [Monitoring Service](<#monitoring-service(optional)>)
  - [Web Client](#web-client)
  - [Mobile Client](<#mobile-client(android)>)

---

## Demo

### Live Site Demo

Link: Not deployed yet

### Video Demo

![demogif](https://github.com/yuchiu/today-news/blob/master/today-gif-demo.gif)

---

## Tech Stack

### Client Side

    Reactjs ∙ React Native ∙ Redux ∙ React-Redux ∙ React-Router ∙ Redux-Thunk ∙ Axios

### Server Side

    Python ∙ Nodejs ∙ Expressjs ∙ RPC API ∙ Redis ∙ RabbitMQ ∙ ElasticSearch ∙ MongoDB ∙ Mongoose ∙
    Web Scraper ∙ Tensorflow ∙ Docker

---

## System Architecture Diagram

![architecture](https://i.imgur.com/bpKhOMj.jpg)

---

## Tools & Softwares

### Operating System this project is using during development

| OS     | Version |
| ------ | ------- |
| ubuntu | 18.04   |

### Required tools & version this project is using

| Tools         | Versions        |
| ------------- | --------------- |
| npm           | 6.1.0           |
| pip3          | 9.0.1           |
| nodejs        | 10.7.0          |
| python3       | 3.6.5           |
| mongodb       | 3.6             |
| redis         | 4.0.11          |
| elasticsearch | 2.4.6           |
| rabbitmq      | using CloudAMQP |

### Optional tools & version this project is using

| Tools                     | Versions   |
| ------------------------- | ---------- |
| For Mobile Client         |
| react-native              | 0.57.5     |
| react-native-cli          | 2.0.1      |
| For Production Deployment |
| docker                    | 18.06.1-ce |
| docker-compose            | 1.22.0     |

---

## Development Environment

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

- start Topic-Modeling-Service for news pipeline to classify new data

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

### Serving Application

#### Preference Log Process Service(Optional)

- process user's preference based on his/her clicks on news using time decay model  
  user's preferences will be store in DB for News-Recommendation-Service to use  
  preference log task is queued in RabbitMQ, therefore Preference-Log-Process-Service can be running along with services or running asynchronously during offline

- install dependencies & launch Click-Log-Process-Service

```terminal
pip3 install -r requirements.txt
python3 service.py
```

#### News Recommendation Service

- Recommend news to News Service by user Id and news topic based on the data stored from Preference-Log-Process-Service

- install dependencies & start News-Recommendation-Service

```terminal
pip3 install -r requirements.txt
python3 recommendation.py
```

Application will be serving on http://localhost:7070

#### News Service

- install dependencies & start News-Service

```terminal
pip3 install -r requirements.txt
python3 service.py
```

Application will be serving on http://localhost:6060

#### Search Service

- for a new environment, run the following script to populate ElasticSearch indices with MongoDB's Data.  
  do not run this multiple times, only populate ElasticSearch's indices when needed

```terminal
npm run initialize-indices
```

- install dependencies & start Search-Service

```terminal
npm install
npm start
```

Application will be serving on http://localhost:5050

#### User Service

- install dependencies & start User-Service

```terminal
npm install
npm start
```

Application will be serving on http://localhost:4040

#### Web Server

- install dependencies & start Web-Server

```terminal
npm install
npm start
```

Application will be serving on http://localhost:3030

#### Monitoring Service(Optional)

- install dependencies & start application

```terminal
npm install
npm start
```

This service will be monitoring all other services **except** for services that runs in async pipeline, i.e Topic-Modeling-Service, Data-Pipeline & Click-Log-Process-Service.

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

---
