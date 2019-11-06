import React, { useCallback } from 'react';

import {
  Box, Text,
} from 'grommet';

import isNull from 'lodash/isNull';
import useCampaign from '../../../hooks/useCampaign';
import Step from '../../../components/Step';

function copyToClipboard(text) {
  const input = document.createElement('input');

  input.setAttribute('value', text);
  document.body.appendChild(input);
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);
}

const CampaignMessageStep = () => {
  const { campaign, campaignId } = useCampaign();

  const onCopyClick = useCallback(() => copyToClipboard(`${campaign.message} https://resms.io/${campaignId}`), [campaign]);

  if (isNull(campaign)) {
    return <Text>Loading</Text>;
  }

  if (!campaign) {
    return <Text>Campaign not found</Text>;
  }

  return (
    <Step
      backUrlTitle="Edit campaign"
      backUrlHref="/campaigns/[id]/preview"
      backUrlAs={`/campaigns/${campaignId}/preview`}
      submitShowed={false}
      stepLabel="LAST STEP"
      title="You’ve done it!"
      description="Your campaign is now live! There is a single step left — grab the generated message and send to your audience with a provider of your choice."
    >
      <Box align="center">
        <Text size="xsmall">CLICK MESSAGE TO COPY</Text>
        <Box
          fill
          direction="row"
          background="white"
          round="medium"
          margin={{ top: 'small' }}
          pad={{ vertical: 'small', horizontal: 'medium' }}
          onClick={onCopyClick}
        >
          <Text size="small">{campaign.message}</Text>
          &nbsp;
          {/*<Text color="brand">{`https://resms.io/${campaignId}`}</Text>*/}
          <Text size="small" color="brand">https://resms.io/baar1</Text>
        </Box>
      </Box>
    </Step>
  );
};

export default CampaignMessageStep;
