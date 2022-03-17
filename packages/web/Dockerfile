FROM node:14.16 as build_web
WORKDIR /app/imuzik/web
COPY package.json yarn.lock ./
RUN yarn

COPY . ./

ENV REACT_APP_BACKEND_HOST=http://local-a.tivi360.vn:8100
RUN echo $REACT_APP_BACKEND_HOST
RUN yarn build

FROM nginx:1.18-alpine
COPY --from=build_web /app/imuzik/web/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

