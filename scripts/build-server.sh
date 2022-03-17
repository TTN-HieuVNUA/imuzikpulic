#!/bin/sh
set -e -x

REGISTRY=registry.gitlab.com/imuzik/imusik-web
SERVER_VERSION=$(grep version packages/server/package.json | cut -f 4 -d\")
BUILD_VERSION="$SERVER_VERSION-$(git rev-parse --short=9 HEAD)"
IMAGE="$REGISTRY/server:$BUILD_VERSION"

cd packages/server && yarn lint

docker build -t $IMAGE . &&  docker push $IMAGE
