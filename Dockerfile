FROM node:14

WORKDIR /app

COPY package.json /app

RUN yarn

COPY . /app

RUN yarn build

ENV NODE_ENV production
ENV MONGO_URI "mongodb://host.docker.internal/bmcjt"
ENV PORT 8080

CMD ["npm", "start"]

EXPOSE 8080