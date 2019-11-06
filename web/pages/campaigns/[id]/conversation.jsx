import React from 'react';

import {
  Box, Image, Text,
} from 'grommet';
import isNull from 'lodash/isNull';
import Content from '../../../components/Content';
import Step from '../../../components/Step';

import useCampaign from '../../../hooks/useCampaign';

function CampaignConversationStep() {
  const { campaign, campaignId } = useCampaign();

  if (isNull(campaign)) {
    return <Text>Loading</Text>;
  }

  if (!campaign) {
    return <Text>Campaign not found</Text>;
  }

  return (
    <Step
      backUrlTitle="Edit message"
      backUrlHref="/campaigns/[id]/message"
      backUrlAs={`/campaigns/${campaignId}/message`}
      submitDisabled={!campaign.content.length || campaign.content.some((block) => !block.value)}
      submitHref="/campaigns/[id]/customization"
      submitAs={`/campaigns/${campaignId}/customization`}
      stepLabel="STEP 2"
      title="Build conversation"
      description="The conversation you're about to build is happening after recipient clicks a link in the original SMS."
    >
      <Box gap="medium" width="70vw">
        <Box round="large" background="white" pad="11px">
          <Text size="small" weight="bold">{campaign.message}</Text>
        </Box>
        <Box round="large" overflow="hidden">
          <Box
            height="50vw"
            align="center"
            justify="center"
            background="light-1"
          >
            <Box fill height="small" width="small">
              <Image
                fit="cover"
                src={campaign.image}
              />
            </Box>
          </Box>
          <Box background="white">
            <Text size="xsmall" weight="bold" margin="11px">{campaign.title}</Text>
            <Box pad={{ horizontal: 'medium', bottom: 'medium' }}>
              <Text color="dark-4" size="xsmall">
                resms.io/am1a
              </Text>
            </Box>
          </Box>
        </Box>
        <Box>
          <Content />
        </Box>
      </Box>
    </Step>
  );
}

export default CampaignConversationStep;
