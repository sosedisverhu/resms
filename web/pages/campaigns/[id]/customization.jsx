import React from 'react';

import {
  Box, Text,
} from 'grommet';

import isNull from 'lodash/isNull';
import getCampaign from '../../../hooks/getCampaign';
import Step from '../../../components/Step';
import CustomizationCheckBox from '../../../components/CustomizationCheckBox';

const settings = [
  { type: 'analytics', title: 'Track recipient\'s activity', description: 'Open rate, clicks, conversions, etc.' },
  { type: 'chat', title: 'Continue conversation in chat', description: 'A real-time chat appears below messages.' },
  { type: 'domain', title: 'Use custom domain', description: 'Custom domain will appear in the browser.' },
  { type: 'notifications', title: 'Enable push notifications', description: 'Ask recipient to allow push notifications.' },
];

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
      backUrl={{ showed: true, title: 'Edit conversation', href: `/campaigns/${campaignId}/conversation` }}
      submitHref={`/campaigns/${campaignId}/preview`}
      step={3}
      title="Customize experience"
      description="Now lets customize user experience to match your needs. "
    >
      <Box gap="medium" align="center">
        <Box>
          { settings.map((setting) => (
            <CustomizationCheckBox
              type={setting.type}
              title={setting.title}
              description={setting.description}
              key={setting.type}
            />
          )) }
        </Box>
      </Box>
    </Step>
  );
};

export default CampaignMessageStep;
