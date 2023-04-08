# API - Stratum exchange

## Deployment

TBD

## Getting started

- npm install

- npm run dev : runs development mode with nodemon (make sure redis is installed on your system!)
- npm start : runs development mode without nodemon (make sure redis is installed on your system!)

API is running on port 3033 http://localhost:3033

## Docker

Please make sure you have [Docker](https://docs.docker.com/install/) first.

Next, make a copy of the needed `.env.example` file, and update the relevant variables.

Finally, to start the services run:

    docker compose up

This will start two services:
- `app`: the backend
- A redis instance