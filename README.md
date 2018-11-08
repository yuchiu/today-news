# Usage

## Tech Stack

### Client Side

    Reactjs ∙ Redux ∙ React-Redux ∙ React-Router ∙ Redux-Thunk ∙ Reselect ∙ Axios ∙ SCSS ∙ Ant Design

### Server Side

    Python ∙ Nodejs ∙ TypeScript ∙ Expressjs ∙ RESTful API ∙ RPC API ∙ Redis ∙ RabbitMQ ∙ MongoDB ∙
    Mongoose ∙ Web Scraper ∙ Tensorflow

---

## required softwares & version this project is using

| Softwares | Versions        |
| --------- | --------------- |
| npm       | 6.1.0           |
| pip3      | 9.0.1           |
| nodejs    | 10.7.0          |
| python3   | 3.6.5           |
| mongodb   | 3.6             |
| Redis     | 4.0.11          |
| rabbitmq  | using CloudAMQP |

default redis port: 6379
default mongodb port: 27017

## Development

### Building Data Warehouse

#### News Data Pipeline

- script to launch the data pipeline that scrape latest news from different news sources

```terminal
sh news_pipeline_launcher.sh
```

#### Preference Log Processor

- script to launch click log processor pipeline that process user's preference based on his/her clicks

```terminal
sh launcher.sh
```

#### News Topic Modeling Service

- install requirements & launch news classifier trainer to create topic model

```terminal
pip3 install -r requirements.txt
python3 trainer/news_classify_trainer.py
```

- start topic modeling service for news pipeline to classify new data

```terminal
pip3 install -r requirements.txt
python3 server/server.py
```

Application will be serving on http://localhost:6060

### Serving Application

#### News Recommendation Service

- script to install dependencies & start news recommendation service

```terminal
sh launcher.sh
```

Application will be serving on http://localhost:5050

#### Backend Server

- script to install dependencies & start application

```terminal
sh launcher.sh
```

Application will be serving on http://localhost:4040

#### Web Server

- install dependencies & start application

```terminal
npm install
npm start
```

Application will be serving on http://localhost:3030

#### Web Client

- install dependencies & start application

```terminal
npm install
npm start
```

Application will be serving on http://localhost:3000
