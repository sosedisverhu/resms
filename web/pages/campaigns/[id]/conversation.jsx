import React from 'react';
import { Text } from 'grommet';
import isNull from 'lodash/isNull';

import CampaignBlocks from '../../../components/CampaignBlocks';
import Step from '../../../components/Step';
import useCurrentCampaign from '../../../hooks/useCurrentCampaign';

function CampaignConversationStep() {
  const [campaign] = useCurrentCampaign();

  if (!campaign) {
    return <Text>Loading...</Text>;
  }

  if (isNull(campaign)) {
    return <Text>Campaign was not found.</Text>;
  }

  return (
    <Step step={1}>
      <CampaignBlocks />
    </Step>
  );
}

export default CampaignConversationStep;
