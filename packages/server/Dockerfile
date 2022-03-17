
FROM node:14.16 as build_server
WORKDIR /app/imuzik/server
COPY package.json yarn.lock ./
RUN yarn

COPY src tsconfig.json tsconfig.build.json nest-cli.json ./
RUN yarn build


FROM node:14.16-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app/imuzik/server
COPY package.json yarn.lock ./
RUN yarn install --production=true

COPY --from=build_server /app/imuzik/server/dist ./dist

CMD ["node", "dist/main"]
#EXPOSE 5500
#EXPOSE 8088