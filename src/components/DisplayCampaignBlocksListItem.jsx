import React from 'react';
import { Box } from 'grommet';

function DisplayCampaignBlocksListItem({ Component, blockIndex }) {
  return (
    <Box
      align="center"
      direction="row"
      margin={{ bottom: 'small' }}
      style={{ position: 'relative', userSelect: 'none' }}
    >
      <Box fill justify="start" style={{ position: 'relative' }}>
        <Component blockIndex={blockIndex} />
      </Box>
    </Box>
  );
}

export default DisplayCampaignBlocksListItem;
