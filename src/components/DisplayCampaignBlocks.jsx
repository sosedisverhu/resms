import React from 'react';
import styled from 'styled-components';

import DisplayCampaignBlocksListItem from './DisplayCampaignBlocksListItem';
import DisplayCampaignBlocksList from './DisplayCampaignBlocksList';
import useCurrentCampaign from '../hooks/useCurrentCampaign';
import DisplayCampaignInitialBlocks from './DisplayCampaignInitialBlocks';

const Box = styled.div`
  background: white;
  padding: 24px 18px;
`;

function DisplayCampaignBlocks() {
  const [campaign] = useCurrentCampaign();

  return (
    <Box>
      <DisplayCampaignInitialBlocks />
      <DisplayCampaignBlocksList
        items={campaign.content}
        ItemComponent={DisplayCampaignBlocksListItem}
      />
    </Box>
  );
}

export default DisplayCampaignBlocks;
