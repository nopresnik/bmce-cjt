FROM node:14

WORKDIR /app

COPY package.json ./

RUN npm install

ADD . .

RUN npm run build

ENV NODE_ENV production
ENV PORT 8080

CMD ["npm", "start"]

EXPOSE 8080