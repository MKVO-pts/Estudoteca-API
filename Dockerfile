FROM node:alpine
#copy files to /app in container
COPY . /app
WORKDIR /app

#execute comands
RUN npm install


#port
EXPOSE 80
#port for mongodb
EXPOSE 27017

#run node.js
CMD node
