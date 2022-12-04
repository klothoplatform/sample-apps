# @klotho::execution_unit { 
# id = "nginx-helm"
# }
FROM node:alpine
WORKDIR /usr/src/app
COPY app1/src/package.json ./
RUN npm install
COPY . ./

EXPOSE 3000
ENTRYPOINT ["node"]
CMD [ "klotho_runtime/dispatcher.js" ]
