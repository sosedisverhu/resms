import React from 'react';
import { Box } from 'grommet';

import DisplayBlockText from './DisplayBlockText';
import DisplayBlockOpenGraph from './DisplayBlockOpenGraph';

function DisplayCampaignInitialBlocks() {
  return (
    <>
      <div>
        <Box margin={{ bottom: 'small' }}>
          <DisplayBlockText />
        </Box>
      </div>

      <div>
        <Box margin={{ bottom: 'small' }}>
          <DisplayBlockOpenGraph />
        </Box>
      </div>
    </>
  );
}

export default DisplayCampaignInitialBlocks;
