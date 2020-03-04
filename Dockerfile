FROM node:12-alpine AS builder

WORKDIR /app
RUN cd /app

#ARG environment=dev
#ENV environment=${environment}

COPY *.* ./
COPY src ./src/
RUN npm i
RUN npm rebuild node-sass
#RUN npm run build:${environment}
RUN npm run build

FROM nginx:latest
COPY --from=builder /app/dist/affiliate-program /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
