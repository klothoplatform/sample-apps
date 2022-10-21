## THIS IS THE COPIED FILE

FROM node:alpine
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . ./

EXPOSE 3000
ENTRYPOINT ["node"]
CMD [ "klotho_runtime/dispatcher.js" ]
