# iMuzik v2

[![coverage report](https://gitlab.com/imuzik/imusik-web/badges/master/coverage.svg)](https://gitlab.com/imuzik/imusik-web/-/commits/master)

[![pipeline status](https://gitlab.com/imuzik/imusik-web/badges/master/pipeline.svg)](https://gitlab.com/imuzik/imusik-web/-/commits/master)

## Design

- [Web](https://www.figma.com/file/w22XrO2MWIEdXkXTj6uZtD/WEB-Imuzik)
- [App](https://www.figma.com/file/ogeO8wz9r3SexVYGg5ygAM/APP-WAP-Imuzik)

## Deployment

### ElasticSearch Index

```sh
curl --request PUT \
  --url http://localhost:9200/node_idx \
  --header 'authorization: Basic ZWxhc3RpYzpjaGFuZ2VtZQ==' \
  --header 'content-type: application/json' \
  --data '{
    "aliases": {},
    "mappings": {
      "properties": {
        "@timestamp": {
          "type": "date"
        },
        "@version": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 256
            }
          }
        },
        "created_at": {
          "type": "date"
        },
        "id": {
          "type": "long"
        },
        "text": {
          "type": "text",
          "analyzer": "standard_asciifolding",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 256
            }
          }
        },
        "title": {
          "type": "text",
          "analyzer": "standard_asciifolding",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 256
            }
          }
        },
        "type": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 256
            }
          }
        },
        "updated_at": {
          "type": "date"
        }
      }
    },
    "settings": {
      "analysis": {
        "analyzer": {
          "standard_asciifolding": {
            "tokenizer": "standard",
            "filter": [
              "my_ascii_folding"
            ]
          }
        },
        "filter": {
          "my_ascii_folding": {
            "type": "asciifolding",
            "preserve_original": true
          }
        }
    }
  }
}
'
```
