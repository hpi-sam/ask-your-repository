FROM node:10-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . .

RUN yarn install
RUN yarn webpack

EXPOSE 4822
CMD [ "node", "dist/app.js" ]
