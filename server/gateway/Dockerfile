FROM node:lts-alpine

WORKDIR /usr/src

COPY package*.json ./

RUN npm install --silent
ENV PATH /usr/src/node_modules/.bin:$PATH

WORKDIR /usr/src/app

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
