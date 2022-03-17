#!/bin/sh
set -e -x

REGISTRY=registry.gitlab.com/imuzik/imusik-web
WEB_VERSION=$(grep version packages/web/package.json | cut -f 4 -d\")
BUILD_VERSION="$WEB_VERSION-$(git rev-parse --short=9 HEAD)"
IMAGE="$REGISTRY/web-staging:$BUILD_VERSION"

cd packages/web && yarn lint

docker build -t $IMAGE . &&  docker push $IMAGE
