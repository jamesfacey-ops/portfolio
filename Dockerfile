FROM nginx:alpine

# Copy static files
COPY . /usr/share/nginx/html/

# Remove files that shouldn't be served
RUN rm -f /usr/share/nginx/html/Dockerfile \
          /usr/share/nginx/html/nginx.conf \
          /usr/share/nginx/html/.gitignore \
          /usr/share/nginx/html/.gitattributes

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget -qO- http://localhost/ || exit 1
