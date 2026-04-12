# Use a slim version of Node.js for smaller image size
FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
# We copy package-lock.json as well for consistent builds
COPY package*.json ./
RUN npm install

# Copy the rest of your app code
COPY . .

# Expose the port your API runs on (from index.js PORT = 3000)
EXPOSE 3000

# Command to run your app
CMD [ "node", "index.js" ]
