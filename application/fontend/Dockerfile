FROM node:alpine
WORKDIR /urs/app

COPY ./package.json ./
RUN npm install
COPY ./ ./

CMD ["npm", "run", "start"]

