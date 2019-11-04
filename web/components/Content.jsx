import React, { useState, useCallback } from 'react';

import {
  Box, Button, Layer,
} from 'grommet';
import { Add } from 'grommet-icons';
import BlocksPopup from './BlocksPopup';
import getCampaign from '../hooks/getCampaign';
import blocksMap from './blocks/blocksMap';

const Content = () => {
  const { campaign } = getCampaign();
  const [popupShowed, setPopupShowed] = useState();
  const onBlockAddHandler = useCallback(() => setPopupShowed(true), []);
  const onBlockModalCloseHandler = useCallback(() => setPopupShowed(false), []);

  if (!campaign) {
    return null;
  }

  return (
    <Box gap="medium">
      {campaign.content.map((block, i) => {
        const Component = blocksMap[block.type];

        if (!Component) {
          return null;
        }

        return (
          <Component
            key={i}
            blockIndex={i}
          />
        );
      })}
      <Box align="start">
        <Button
          icon={<Add />}
          label="Add block"
          primary={!!campaign.content.length}
          onClick={onBlockAddHandler}
        />
      </Box>
      {popupShowed && (
      <Layer
        background="transparent"
        overflow="hidden"
        position="bottom"
        margin={{ top: 'xlarge' }}
        onClickOutside={onBlockModalCloseHandler}
        onEsc={onBlockModalCloseHandler}
        responsive={false}
        round="large"
        full
      >
        <BlocksPopup />
      </Layer>
      )}
    </Box>
  );
};

export default Content;
