FROM node:10.16-alpine

COPY ./package.json /home/node/app/package.json

WORKDIR /home/node/app

RUN npm install -g nodemon

RUN npm install