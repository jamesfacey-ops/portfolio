#!/bin/sh
# Fail fast if N8N_WEBHOOK_URL is not set — prevents nginx starting with broken proxy_pass
: "${N8N_WEBHOOK_URL:?ERROR: N8N_WEBHOOK_URL must be set in the container environment}"

# Inject webhook URL at runtime (never baked into image)
# NOTE: Uses | as sed delimiter — safe as long as URL contains no | character.
# If URL ever contains & (e.g. query params), escape it: ${N8N_WEBHOOK_URL//&/\\&}
# The expected URL http://10.0.0.130:5678/webhook/portfolio-contact has neither character.
sed -i "s|__N8N_WEBHOOK_URL__|${N8N_WEBHOOK_URL}|g" /etc/nginx/conf.d/default.conf

exec nginx -g "daemon off;"
