FROM node:12-alpine

WORKDIR /app
RUN cd /app

#ARG environment=dev
#ENV environment=${environment}

RUN npm i -g http-server

COPY *.* ./
COPY src ./src/
RUN npm i
RUN npm rebuild node-sass
#RUN npm run build:${environment}
RUN npm run build

EXPOSE 8080
CMD ["http-server", "dist/affiliate-program"]
