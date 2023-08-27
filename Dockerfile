# Use a Node.js 16 image as the base
FROM node:16

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

# Create a user named stratum and set ownership
RUN adduser --disabled-password --gecos '' stratum && \
    chown -R stratum:stratum /app

# Use the user named stratum
USER stratum

# Start the app when the container is run
CMD ["npm", "run", "start"]
