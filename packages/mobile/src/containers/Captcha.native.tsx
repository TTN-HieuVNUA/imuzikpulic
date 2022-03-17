import React from 'react';
import { WebView } from 'react-native-webview';

import { Box } from '../rebass';

export default function Captcha({ content }: { content: string }) {
  return (
    <Box width={150} height={50}>
      <WebView
        style={{ backgroundColor: 'white' }}
        source={{
          html: `
            <html>
              <head>
                <meta name="viewport" content="width=150, initial-scale=1">
                <style>
                  body, html {
                    padding: 0px;
                    margin: 0px;
                  }
                </style>
              <head>
              <body>
                ${content}
              </body>
            </html>
            `,
        }}
      />
    </Box>
  );
}
