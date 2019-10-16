FROM nginx:alpine

WORKDIR /app

COPY ./dist /app

COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80