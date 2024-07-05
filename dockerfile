# Use an official Node.js runtime as a parent image
FROM node:14
FROM enginx:mainline

# Set the working directory in the container
WORKDIR /dating-app

# Copy package.json and package-lock.json for the server
COPY package*.json ./

# Install server dependencies
RUN npm install

WORKDIR /dating-app/Client

# Copy package.json and package-lock.json for the server
COPY package*.json ./

# Install server dependencies
RUN npm install

# Back to main Dir
WORKDIR /dating-app

# Copy the rest of the server application code
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
