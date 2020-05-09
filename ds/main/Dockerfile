FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --silent

COPY . .

EXPOSE 6006

CMD [ "npm", "run", "storybook" ]
