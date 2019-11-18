import React from 'react';
import { Box, Text } from 'grommet';
import isNull from 'lodash/isNull';

import Step from '../../../components/Step';
import useCurrentCampaign from '../../../hooks/useCurrentCampaign';
import CustomizationCheckBox from '../../../components/CustomizationCheckBox';

const settings = [
  {
    type: 'analytics',
    title: "Track recipient's activity",
    description: 'Open rate, clicks, conversions, etc.',
  },
  {
    type: 'chat',
    title: 'Continue conversation in chat',
    description: 'A real-time chat appears below messages.',
  },
  {
    type: 'domain',
    title: 'Use custom domain',
    description: 'Custom domain will appear in the browser.',
  },
  {
    type: 'notifications',
    title: 'Enable push notifications',
    description: 'Ask recipient to allow push notifications.',
  },
];

function CampaignMessageStep() {
  const [campaign] = useCurrentCampaign();

  if (!campaign) {
    return <Text>Loading...</Text>;
  }

  if (isNull(campaign)) {
    return <Text>Campaign was not found.</Text>;
  }

  return (
    <Step step={2}>
      {settings.map((setting) => (
        <Box margin={{ top: 'medium' }} key={setting.type}>
          <CustomizationCheckBox
            type={setting.type}
            title={setting.title}
            description={setting.description}
          />
        </Box>
      ))}
    </Step>
  );
}

export default CampaignMessageStep;
