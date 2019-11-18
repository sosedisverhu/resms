import React from 'react';
import { Box } from 'grommet';
import { Drag } from 'grommet-icons';

function CampaignBlocksListItemDragHandle(props) {
  return (
    <Box
      pad="small"
      background="transparent"
      style={{
        position: 'absolute',
        right: '100%',
        top: 'calc(50% - 24px / 2)',
      }}
      {...props}
    >
      <Drag size="small" />
    </Box>
  );
}

export default CampaignBlocksListItemDragHandle;
