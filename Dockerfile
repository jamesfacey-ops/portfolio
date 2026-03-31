FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Build args — only non-sensitive values baked in
# TURNSTILE_SITE_KEY: public by Cloudflare design (safe to bundle)
# AVAILABILITY_MESSAGE: benign text (safe to bundle)
# N8N_WEBHOOK_URL: NOT a build arg — injected at runtime via entrypoint.sh
ARG AVAILABILITY_MESSAGE="Available for contract work"
ARG TURNSTILE_SITE_KEY=""
ENV AVAILABILITY_MESSAGE=$AVAILABILITY_MESSAGE
ENV TURNSTILE_SITE_KEY=$TURNSTILE_SITE_KEY

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY limits.conf /etc/nginx/conf.d/limits.conf
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget -qO- http://localhost/ || exit 1

ENTRYPOINT ["/entrypoint.sh"]
