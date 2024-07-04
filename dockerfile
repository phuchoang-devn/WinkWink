# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Change the working directory to the client folder
WORKDIR /app/client

# Copy package.json and package-lock.json for the frontend
COPY client/package*.json ./

# Install frontend dependencies
RUN npm install

# Change the working directory back to the root
WORKDIR /app
# Copy the rest of the application code
COPY . .

# Install Client dependencies

# Expose the port your app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
