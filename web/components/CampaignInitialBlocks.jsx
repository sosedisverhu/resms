import React from 'react';
import { Box } from 'grommet';

import BlockText from './BlockText';
import BlockOpenGraph from './BlockOpenGraph';

function CampaignInitialBlocks() {
  return (
    <>
      <div>
        <Box margin={{ bottom: 'small' }}>
          <BlockText />
        </Box>
      </div>

      <div>
        <Box margin={{ bottom: 'small' }}>
          <BlockOpenGraph />
        </Box>
      </div>
    </>
  );
}

export default CampaignInitialBlocks;
