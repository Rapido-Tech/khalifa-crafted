FROM node:20-alpine as builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your app
COPY . .

# Build the Next.js app
RUN npm run build

# Production image
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app ./
RUN npm install --omit=dev

EXPOSE 3000

# Run the Next.js app
CMD ["npm", "start"]
