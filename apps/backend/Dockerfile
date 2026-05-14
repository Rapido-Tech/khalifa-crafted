# Use Node.js base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Accept build-time environment variables
ARG CLOUDINARY_API_KEY
ARG CLOUDINARY_API_SECRET
ARG CLOUDINARY_CLOUD_NAME
ARG DB_URI


# Set environment variables (optional – only set if needed at runtime)
ENV CLOUDINARY_API_KEY=${CLOUDINARY_API_KEY} \
    CLOUDINARY_API_SECRET=${CLOUDINARY_API_SECRET} \
    CLOUDINARY_CLOUD_NAME=${CLOUDINARY_CLOUD_NAME} \
    DB_URI=${DB_URI}

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application files
COPY . .

# Build TypeScript
RUN npm run build

# Expose application port
EXPOSE 5000

# Start the server
CMD ["node", "dist/server.js"]
