import React, { ReactElement, useCallback } from 'react';
import { Box, Button, Flex } from 'rebass';

import Icon from '../components/Icon';
import { Collection, usePlayer } from '../components/Player';

interface Props {
  collection: Collection;
}

export function PlayAllButton({ collection }: Props): ReactElement {
  const player = usePlayer();
  const callback = useCallback(() => {
    player?.playCollection(collection,0);
  }, [player, collection]);
  return (
    <Button variant="primary" onClick={callback}>
      <Flex flexDirection="row" alignItems="center" justifyContent="center">
        <Box mr={2}>
          <Icon name="tune" size={17} />
        </Box>
        Nghe tất cả
      </Flex>
    </Button>
  );
}
