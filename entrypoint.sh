#!/bin/sh
set -e

PUID=${PUID:-1001}
PGID=${PGID:-1001}

if [ "$PUID" != "0" ] && [ "$PGID" != "0" ]; then
  sed -i "s/^nodejs:[^:]*:[^:]*:/nodejs:x:$PGID:/" /etc/group
  sed -i "s/^nextjs:[^:]*:[^:]*:[^:]*:/nextjs:x:$PUID:$PGID:/" /etc/passwd
fi

# Internal files ownership (numeric IDs, avoid username conflict with node:1000)
chown -R "$PUID:$PGID" /app/node_modules /app/public /app/.next /app/server.js /app/package.json 2>/dev/null || true

# Mounted volumes: ensure world-readable
chmod -R o+rX /app/content /app/config.toml 2>/dev/null || true

exec su-exec "$PUID:$PGID" "$@"
