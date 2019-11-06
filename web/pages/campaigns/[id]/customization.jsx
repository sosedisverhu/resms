import React from 'react';

import {
  Box, Text,
} from 'grommet';

import isNull from 'lodash/isNull';
import useCampaign from '../../../hooks/useCampaign';
import Step from '../../../components/Step';
import CustomizationCheckBox from '../../../components/CustomizationCheckBox';

const settings = [
  { type: 'analytics', title: 'Track recipient\'s activity', description: 'Open rate, clicks, conversions, etc.' },
  { type: 'chat', title: 'Continue conversation in chat', description: 'A real-time chat appears below messages.' },
  { type: 'domain', title: 'Use custom domain', description: 'Custom domain will appear in the browser.' },
  { type: 'notifications', title: 'Enable push notifications', description: 'Ask recipient to allow push notifications.' },
];

function CampaignMessageStep() {
  const { campaign, campaignId } = useCampaign();

  if (isNull(campaign)) {
    return <Text>Loading</Text>;
  }

  if (!campaign) {
    return <Text>Campaign not found</Text>;
  }

  return (
    <Step
      backUrlTitle="Edit conversation"
      backUrlHref="/campaigns/[id]/conversation"
      backUrlAs={`/campaigns/${campaignId}/conversation`}
      submitHref="/campaigns/[id]/preview"
      submitAs={`/campaigns/${campaignId}/preview`}
      stepLabel="STEP 3"
      title="Customize experience"
      description="Now lets customize user experience to match your needs."
    >
      <Box gap="medium" align="center">
        <Box>
          { settings.map((setting) => (
            <Box margin={{ top: 'medium' }}>
              <CustomizationCheckBox
                type={setting.type}
                title={setting.title}
                description={setting.description}
                key={setting.type}
              />
            </Box>
          )) }
        </Box>
      </Box>
    </Step>
  );
}

export default CampaignMessageStep;
