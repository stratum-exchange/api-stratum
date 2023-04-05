# Use a Node.js 14 image as the base
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the app's dependencies
RUN npm install

# Copy the rest of the app's files to the container
COPY . .

# Expose port 3033
EXPOSE 3033

# Start the app when the container is run
CMD ["npm", "start"]
