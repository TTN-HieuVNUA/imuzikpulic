FROM node:14.16 as build_wap
WORKDIR /app/imuzik/wap
COPY package.json yarn.lock ./

RUN yarn
COPY . ./

RUN yarn build

FROM node:14.16-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app/imuzik/wap
COPY package.json yarn.lock ./
RUN yarn install --production=true

COPY --from=build_wap /app/imuzik/wap/next.config.js ./
COPY --from=build_wap /app/imuzik/wap/.next ./.next

CMD ["yarn", "next", "start","-p","80"]


