# Description

An example piece of source code (user-management-system) of API back end written in NestJS.

# Local Development

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## MailModule

MailerService in development environment without sending real email to recepient with credentialsof test account in *MAILER_TRANSPORT* env var. 
Navigate to the server and login with these credentials.

# Deployment to the cloud

## Environment Variables

```
PORT
HOST
APP_NAME
DATABASE_URL
MAILER_TRANSPORT
RATE_LIMIT_WINDOW_MS,
RATE_LIMIT_MAX,
```

## Heroku

Procfile: 
> `web: npm run start:prod`

### CLI Script

```bash
# on master branch
heroku git:remote -a sz-nest-api
git push heroku master
```
In heroku UI promote app through deployment pipeline

## Copyright

SeedZoo

## Authors
- Max Vresch (max.vresch@gmail.com, [LinkedIn](http://www.linkedin.com/in/vresch))
- Roman Kunitsyn (roman.kunitsyn@gmail.com, [LinkedIn](http://www.linkedin.com/in/romankunitsyn))
