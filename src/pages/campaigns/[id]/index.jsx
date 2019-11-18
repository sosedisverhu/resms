import React, { useCallback } from 'react';

import { Box, Text, Button } from 'grommet';

import isNull from 'lodash/isNull';
import useCurrentCampaign from '../../../hooks/useCurrentCampaign';
import Step from '../../../components/Step';
import CampaignLink from '../../../components/CampaignLink';

function copyToClipboard(text) {
  const input = document.createElement('input');

  input.setAttribute('value', text);
  document.body.appendChild(input);
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);
}

function CampaignMessageStep() {
  const [campaign] = useCurrentCampaign();

  const onCopyClick = useCallback(
    () => copyToClipboard(`${campaign.message} https://resms.io/${campaign.id}`),
    [campaign],
  );

  if (!campaign) {
    return <Text>Loading...</Text>;
  }

  if (isNull(campaign)) {
    return <Text>Campaign was not found.</Text>;
  }

  return (
    <Step step={4}>
      <Box align="center">
        <Text size="xsmall" color="dark-4" margin={{ bottom: 'xsmall' }}>
          CLICK MESSAGE TO COPY
        </Text>
        <Box
          round="medium"
          pad={{ horizontal: 'medium', vertical: 'small' }}
          elevation="xsmall"
          background="white"
        >
          <Button
            label={(
              <Text style={{ lineHeight: 1, fontSize: 14, fontWeight: '500' }}>
                {campaign.message}
                {' '}
                <CampaignLink size="inherit" color="brand" />
              </Text>
            )}
            plain
            onClick={onCopyClick}
          />
        </Box>
      </Box>
    </Step>
  );
}

export default CampaignMessageStep;
