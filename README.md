# Usage

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

### News Pipeline Service

1. script to launch the data pipeline that scrape latest news from different news sources

```terminal
sh news_pipeline_launcher.sh
```

### Preference Log Processor

1. script to launch click log processor pipeline that process user's preference based on his/her clicks

```terminal
sh launcher.sh
```

### news-topic-modeling-trainer

1. script to launch news classifier trainer to create topic model

```terminal
sh launcher.sh
```

### News Recommendation Service

1. script to install dependencies & start news recommendation service

```terminal
sh launcher.sh
```

Application will be serving on http://localhost:5050

### Backend Server

1. script to install dependencies & start application

```terminal
sh launcher.sh
```

Application will be serving on http://localhost:4040

### Web Server

1. install dependencies & start application

```terminal
npm install
npm start
```

Application will be serving on http://localhost:3030

### Web Client

1. install dependencies & start application

```terminal
npm install
npm start
```

Application will be serving on http://localhost:3000
