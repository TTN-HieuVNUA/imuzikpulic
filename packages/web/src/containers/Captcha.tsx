import React from 'react';

export default function Captcha({ content }: { content: string }) {
  return (
    <div
      style={{ width: 150, height: 50, backgroundColor: 'white' }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
