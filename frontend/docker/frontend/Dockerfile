FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm install

# Install Tailwind CSS and its dependencies
RUN npm install tailwindcss@^3.4.0 postcss@^8.4.35 autoprefixer@^10.4.17 \
  @tailwindcss/postcss@^4.1.4 @tailwindcss/container-queries@^0.1.1

# Copy the rest of the application code
COPY . .

# Copy Tailwind/PostCSS config files
COPY angular.json .
COPY tailwind.config.js .
COPY postcss.config.js .

# Set public URL and install Angular CLI
ENV PUBLIC_URL=/
RUN npm install -g @angular/cli

# Build the Angular app
RUN npm run build

# Stage 2: Nginx server
FROM nginx:alpine

# Clean default html
RUN rm -rf /usr/share/nginx/html/*

# Copy build from previous stage
COPY --from=build /app/dist/frontend /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
