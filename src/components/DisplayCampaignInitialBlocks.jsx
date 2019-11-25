import React from 'react';
import styled from 'styled-components';

import DisplayBlockText from './DisplayBlockText';
import DisplayBlockOpenGraph from './DisplayBlockOpenGraph';

const Box = styled.div`
  border-radius: 17.5px;
  margin-bottom: 6px;
`;

function DisplayCampaignInitialBlocks() {
  return (
    <>
      <div>
        <Box>
          <DisplayBlockText />
        </Box>
      </div>

      <div>
        <Box>
          <DisplayBlockOpenGraph />
        </Box>
      </div>
    </>
  );
}

export default DisplayCampaignInitialBlocks;
