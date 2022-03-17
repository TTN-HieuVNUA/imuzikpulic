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
            "name": "Chart"
          },
          {
            "name": "ContentProvider"
          },
          {
            "name": "ContentProviderDetail"
          },
          {
            "name": "Genre"
          },
          {
            "name": "Member"
          },
          {
            "name": "PublicUser"
          },
          {
            "name": "RbtPackage"
          },
          {
            "name": "RingBackTone"
          },
          {
            "name": "RingBackToneCreation"
          },
          {
            "name": "Singer"
          },
          {
            "name": "Song"
          },
          {
            "name": "Topic"
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
            "name": "CommentPayload"
          },
          {
            "name": "GenerateCaptchaPayload"
          },
          {
            "name": "GroupPayload"
          },
          {
            "name": "MemberPayload"
          },
          {
            "name": "RbtCreationPayload"
          },
          {
            "name": "ReplyPayload"
          },
          {
            "name": "SongPayload"
          },
          {
            "name": "SpamPayload"
          },
          {
            "name": "StringPayload"
          }
        ]
      }
    ]
  }
};
      export default result;
    