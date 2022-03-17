/* tslint:disable */
/* eslint-disable */

      export interface IntrospectionResultData {
        __schema: {
          types: {
            kind: string;
            name: string;
            possibleTypes: {
              name: string;
            }[];
          }[];
        };
      }
      const result: IntrospectionResultData = {
  "__schema": {
    "types": [
      {
        "kind": "INTERFACE",
        "name": "Node",
        "possibleTypes": [
          {
            "name": "Member"
          },
          {
            "name": "Chart"
          },
          {
            "name": "Song"
          },
          {
            "name": "Singer"
          },
          {
            "name": "Genre"
          },
          {
            "name": "RingBackTone"
          },
          {
            "name": "ContentProvider"
          },
          {
            "name": "PublicUser"
          },
          {
            "name": "Topic"
          },
          {
            "name": "RbtPackage"
          },
          {
            "name": "RingBackToneCreation"
          },
          {
            "name": "ContentProviderDetail"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "Payload",
        "possibleTypes": [
          {
            "name": "AuthenticatePayload"
          },
          {
            "name": "StringPayload"
          },
          {
            "name": "GenerateCaptchaPayload"
          },
          {
            "name": "MemberPayload"
          },
          {
            "name": "SpamPayload"
          },
          {
            "name": "SongPayload"
          },
          {
            "name": "CommentPayload"
          },
          {
            "name": "ReplyPayload"
          },
          {
            "name": "GroupPayload"
          },
          {
            "name": "RbtCreationPayload"
          }
        ]
      }
    ]
  }
};
      export default result;
    