FROM node:13.14.0
EXPOSE 8081
COPY . /App
WORKDIR /App
RUN npm install
ENTRYPOINT ["node", "simplefileserver.js"]