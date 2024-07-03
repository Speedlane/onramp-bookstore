# Stage 1: Build the application
# Using node:22-alpine as the base image for building
FROM node:22-alpine as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json to the working directory
COPY package.json ./

# Install all dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Stage 2: Prepare the environment and install production dependencies
# Using node:22-alpine as the base image for production dependencies
FROM node:22-alpine as production-deps

# Set the working directory inside the container
WORKDIR /app

# Copy package*.json to the working directory
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Stage 3: Run the application
# Using node:22-alpine as the base image for running the application
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy production dependencies from the production-deps stage
COPY --from=production-deps /app/node_modules ./node_modules

# Copy package.json from the build stage
COPY --from=build /app/package.json ./package.json

# Copy the built application files from the build stage
COPY --from=build /app/dist ./dist

# Switch to a non-root user for security
USER node

# Expose port 3030 for the application
EXPOSE 3030

# Define the command to run the application
CMD ["node", "dist/server.js"]
