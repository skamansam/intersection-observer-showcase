# Use the official nginx image as base
FROM nginx:alpine

# Copy the static files to nginx's serve directory
COPY . /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Start nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
