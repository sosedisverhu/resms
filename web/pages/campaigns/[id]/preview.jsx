import React from 'react';

import {
  Box, Button, Text,
} from 'grommet';

import { NewWindow } from 'grommet-icons';

import isNull from 'lodash/isNull';
import TestCampaign from '../../../components/TestCampaign';
import getCampaign from '../../../hooks/getCampaign';
import Step from '../../../components/Step';

const CampaignMessageStep = () => {
  const { campaign, campaignId } = getCampaign();

  if (isNull(campaign)) {
    return <Text>Loading</Text>;
  }

  if (!campaign) {
    return <Text>Campaign not found</Text>;
  }

  return (
    <Step
      backUrl={{ showed: true, title: 'Edit conversation', href: `/campaigns/${campaignId}/customization` }}
      submitHref={`/campaigns/${campaignId}/preview`}
      submitTitle="Publish"
      step={4}
      title="Launch campaign"
      description="You're now ready to go live. It is a good idea to send yourself a test message first."
    >
      <Box>
        <Text>Preview campaign in browser</Text>
        <Box align="start">
          <Button
            plain
            justify="start"
            color="brand"
            href={`/campaigns/${campaignId}`}
            icon={<NewWindow color="brand" size="medium" />}
            // label={`https://resms.io/${campaignId}`}
            label="https://resms.io/baar1"
            size="xsmall"
            target="_blank"
          />
        </Box>
        <Box margin={{ top: 'xlarge' }} align="start">
          <TestCampaign />
        </Box>
      </Box>
    </Step>
  );
};

export default CampaignMessageStep;
