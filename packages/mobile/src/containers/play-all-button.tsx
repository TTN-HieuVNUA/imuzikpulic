import React, { ReactElement, useCallback } from 'react';

import { Collection, Icon, usePlayer } from '../components';
import { Button } from '../rebass';

interface Props {
  collection: Collection;
}

export function PlayAllButton({ collection }: Props): ReactElement {
  const player = usePlayer();
  const callback = useCallback(() => {
    player.playCollection(collection, 0);
  }, [player, collection]);
  return (
    <Button
      variant="primary"
      leftIcon={<Icon name="player-play" color="gray" size={7} />}
      fontSize={0}
      width={100}
      onPress={callback}>
      NGHE TẤT CẢ
    </Button>
  );
}
