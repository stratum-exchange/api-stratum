# Use a Node.js 16 image as the base
FROM node:16

# Create the 'docker' group and add 'node' user to it
RUN groupadd -g 112 docker && \
    usermod -aG docker node

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the app's dependencies
RUN npm install

# Copy the rest of the app's files to the container
COPY . .

# Adjust permissions for /app directory and SSL key path
RUN chown -R node:docker /app && \
    mkdir -p /etc/ssl/private && \
    chown -R node:docker /etc/ssl/private

# Expose port 3033
EXPOSE 3033

# Start the app when the container is run
CMD ["npm", "run", "start"]