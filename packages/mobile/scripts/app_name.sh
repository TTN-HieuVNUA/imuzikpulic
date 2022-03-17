#!/bin/sh
APP_NAME=$(grep name manifest.yml |cut -d ':' -f 2| sed 's/ //g')
echo $APP_NAME

