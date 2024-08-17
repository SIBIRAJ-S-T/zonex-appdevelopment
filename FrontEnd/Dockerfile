# Use an official node runtime as a parent image
FROM node:14

#set the working directory in the container
WORKDIR /app

#copy the package.json and package-lock.json files to the container
COPY package*.json ./

#install the dependencies
RUN npm install

#copy the rest of the application code to the container
COPY . .

#expose the port
EXPOSE 3000

CMD ["npm","start"]