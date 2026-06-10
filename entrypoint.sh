#!/bin/sh
set -e

PUID=${PUID:-1001}
PGID=${PGID:-1001}

if [ "$PUID" != "0" ] && [ "$PGID" != "0" ]; then
  groupmod -g "$PGID" nodejs
  usermod -u "$PUID" nextjs
fi

# Internal files only (not mounted volumes content/ config.toml)
chown -R nextjs:nodejs /app/node_modules /app/public /app/.next /app/server.js /app/package.json 2>/dev/null || true

exec su-exec nextjs "$@"
