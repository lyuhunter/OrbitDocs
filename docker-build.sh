#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

VERSION=$(node -p "require('./package.json').version")
IMAGE="orbitdocs:${VERSION}"

PLATFORM="${DOCKER_PLATFORM:-linux/amd64,linux/arm64}"
PUSH=false

while [[ $# -gt 0 ]]; do
  case "$1" in
    --push) PUSH=true; shift ;;
    --platform) PLATFORM="$2"; shift 2 ;;
    --tag) IMAGE="$2"; shift 2 ;;
    *) echo "Usage: $0 [--push] [--platform p1,p2] [--tag name]"; exit 1 ;;
  esac
done

if $PUSH; then
  echo "→ Building multi-platform (${PLATFORM}) and pushing ${IMAGE} ..."
  docker buildx build \
    --platform "${PLATFORM}" \
    --tag "${IMAGE}" \
    --tag "orbitdocs:latest" \
    --push \
    .
else
  echo "→ Building for current platform as ${IMAGE} ..."
  docker buildx build \
    --load \
    --tag "${IMAGE}" \
    --tag "orbitdocs:latest" \
    .
fi

echo "✓ Done: ${IMAGE}"
