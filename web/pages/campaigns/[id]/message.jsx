import React from 'react';
import { Text } from 'grommet';
import isNull from 'lodash/isNull';

import CampaignInitialBlocks from '../../../components/CampaignInitialBlocks';
import Step from '../../../components/Step';
import useCurrentCampaign from '../../../hooks/useCurrentCampaign';

function CampaignMessageStep() {
  const [campaign] = useCurrentCampaign();

  if (!campaign) {
    return <Text>Loading...</Text>;
  }

  if (isNull(campaign)) {
    return <Text>Campaign was not found.</Text>;
  }

  return (
    <Step step={0}>
      <CampaignInitialBlocks />
    </Step>
  );
}

export default CampaignMessageStep;
