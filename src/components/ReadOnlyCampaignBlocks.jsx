import React from 'react';

import CampaignBlocksListItem from './CampaignBlocksListItem';
import CampaignBlocksList from './CampaignBlocksList';
import useCurrentCampaign from '../hooks/useCurrentCampaign';
import CampaignInitialBlocks from './CampaignInitialBlocks';

function CampaignBlocks() {
  const [campaign] = useCurrentCampaign();

  return (
    <>
      <CampaignInitialBlocks />
      <CampaignBlocksList items={campaign.content} ItemComponent={CampaignBlocksListItem} />
    </>
  );
}

export default CampaignBlocks;
