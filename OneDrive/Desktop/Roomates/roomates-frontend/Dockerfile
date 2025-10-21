# --- Stage 1: Build the React App ---
# Use a Node.js image to build our static files
FROM node:20-alpine AS build

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install

# Copy the rest of the source code
COPY . .

# Run the build command
RUN npm run build

# --- Stage 2: Serve the App with Nginx ---
# Use a lightweight Nginx server to host the static files
FROM nginx:1.23-alpine

# Copy the built files from Stage 1
COPY --from=build /app/dist /usr/share/nginx/html

# When a user requests a route like /login, Nginx needs to
# serve the index.html file so React Router can handle it.
COPY default.conf /etc/nginx/conf.d/