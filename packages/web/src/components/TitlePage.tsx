import React from 'react';

export function TitlePage(props: {
  title: string;
}) {
  document.title = props.title??'Một thế giới âm nhạc';
  return (
    <></>
  );
}
