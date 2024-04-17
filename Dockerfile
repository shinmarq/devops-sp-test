FROM node:latest

WORKDIR /src/app

COPY package*.json yarn.lock ./
RUN yarn install --immutable --production=true

COPY . .

EXPOSE 4004
CMD ["yarn", "start"]