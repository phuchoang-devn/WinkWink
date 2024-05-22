# Use the official MongoDB image from Docker Hub
FROM mongo:latest

# Copy the initialization script into the Docker image
COPY init-mongo.js /docker-entrypoint-initdb.d/

# Expose the default MongoDB port
EXPOSE 27017

# Command to run MongoDB
CMD ["mongod"]


#Open a terminal, navigate to the directory containing your 
#Dockerfile and init-mongo.js, and run:

# docker build -t my-mongodb-image .

#Run the MongoDB Container

# docker run -d --name my-mongodb-container -p 27017:27017 my-mongodb-image

