import React from 'react';

import {
  Box, Button, Text, Anchor,
} from 'grommet';

import { NewWindow } from 'grommet-icons';

import isNull from 'lodash/isNull';
import TestCampaign from '../../../components/TestCampaign';
import useCurrentCampaign from '../../../hooks/useCurrentCampaign';
import Step from '../../../components/Step';

function CampaignMessageStep() {
  const [campaign] = useCurrentCampaign();

  if (!campaign) {
    return <Text>Loading...</Text>;
  }

  if (isNull(campaign)) {
    return <Text>Campaign was not found.</Text>;
  }

  return (
    <Step step={3}>
      <Box>
        <Text>Preview campaign in browser</Text>
        <Anchor target="_blank" rel="noreferrer noopener" href={`https://resms.io/${campaign.id}`}>
          <Box align="start">
            <Button
              label={`https://resms.io/${campaign.id}`}
              plain
              color="brand"
              icon={<NewWindow color="brand" size="small" />}
              style={{ fontSize: 14 }}
            />
          </Box>
        </Anchor>
        <Box margin={{ top: 'xlarge' }} align="start">
          <TestCampaign />
        </Box>
      </Box>
    </Step>
  );
}

export default CampaignMessageStep;
