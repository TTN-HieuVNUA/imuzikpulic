FROM node:10.19-alpine
ARG NODE_ENV=production
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . .
EXPOSE 8001
CMD [ "node", "index.js" ]
