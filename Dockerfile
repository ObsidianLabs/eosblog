FROM node:alpine AS builder

WORKDIR /build

COPY package.json yarn.lock /build/

RUN yarn

COPY . .

RUN yarn build


FROM nginx:alpine

WORKDIR /app

COPY --from=builder /build/dist /app

COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80