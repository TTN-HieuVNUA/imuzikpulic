#!/bin/sh
set -e -x

REGISTRY=registry.gitlab.com/imuzik/imusik-web
WAP_VERSION=$(grep version packages/mobile/package.json | cut -f 4 -d\")
BUILD_VERSION="$WAP_VERSION-$(git rev-parse --short=9 HEAD)"
IMAGE="$REGISTRY/wap:$BUILD_VERSION"

cd packages/mobile && yarn lint

docker build -t $IMAGE . &&  docker push $IMAGE
