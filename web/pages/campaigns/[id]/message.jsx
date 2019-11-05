import React from 'react';

import {
  Box, Text,
} from 'grommet';

import find from 'lodash/find';

import isNull from 'lodash/isNull';
import useCampaign from '../../../hooks/useCampaign';
import Step from '../../../components/Step';
import CampaignMessage from '../../../components/CampaignMessage';
import CampaignOpenGraph from '../../../components/CampaignOpenGraph';

const fieldsOrder = ['message', 'image', 'title'];

const CampaignMessageStep = () => {
  const { campaign, campaignId } = useCampaign();

  if (isNull(campaign)) {
    return <Text>Loading</Text>;
  }

  if (!campaign) {
    return <Text>Campaign not found</Text>;
  }

  const activity = {
    message: false,
    image: false,
    title: false,
  };
  const activeFieldName = find(fieldsOrder, (fieldName) => !campaign[fieldName]);

  activity[activeFieldName] = true;

  return (
    <Step
      submitDisabled={!(campaign.message && campaign.title && campaign.image)}
      submitHref={`/campaigns/${campaignId}/conversation`}
      step={1}
      title="Compose message"
      description="The message you specify will be send to recipent\'s phone number as SMS.'"
    >
      <Box gap="small" width="70vw">
        <CampaignMessage isActive={activity.message} />
        <CampaignOpenGraph activity={activity} />
      </Box>
    </Step>
  );
};

export default CampaignMessageStep;
