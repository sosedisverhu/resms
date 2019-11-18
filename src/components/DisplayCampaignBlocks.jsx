import React from 'react';

import { Box } from 'grommet';
import DisplayCampaignBlocksListItem from './DisplayCampaignBlocksListItem';
import DisplayCampaignBlocksList from './DisplayCampaignBlocksList';
import useCurrentCampaign from '../hooks/useCurrentCampaign';
import DisplayCampaignInitialBlocks from './DisplayCampaignInitialBlocks';

function DisplayCampaignBlocks() {
  const [campaign] = useCurrentCampaign();

  return (
    <Box pad="large">
      <DisplayCampaignInitialBlocks />
      <DisplayCampaignBlocksList
        items={campaign.content}
        ItemComponent={DisplayCampaignBlocksListItem}
      />
    </Box>
  );
}

export default DisplayCampaignBlocks;
