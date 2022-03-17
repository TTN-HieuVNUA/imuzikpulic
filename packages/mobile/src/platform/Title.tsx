import React from 'react';
import { Helmet } from 'react-helmet';

import { usePlayer } from '../components';

export default function Title(props: { children?: string }) {
  const player = usePlayer();
  return (
    <Helmet>
      <title>{player.currentPlayable?.title || props.children}</title>
    </Helmet>
  );
}
