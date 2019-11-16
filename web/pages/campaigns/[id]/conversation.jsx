import React from 'react';

import {
  Box, Image, Text, Paragraph,
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
      submitButtonPrimary={false}
      stepLabel="STEP 2"
      title="Build conversation"
      description="The conversation you're about to build is happening after recipient clicks a link in the original SMS."
    >
      <Box gap="medium" width="60vw">
        <div>
          <Box round="large" background="white" pad="11px">
            <Text size="small" weight="bold">{campaign.message}</Text>
          </Box>
        </div>
        <div>
          <Box background="white" round={{ size: 'large', corner: 'bottom' }}>
            <Box
              background="light-1"
              height="50vw"
              round={{ size: 'large', corner: 'top' }}
              overflow="hidden"
            >
              <Image
                fit="cover"
                src={campaign.image}
              />
            </Box>
            <Paragraph size="small" weight="bold" margin={{ horizontal: '11px', vertical: '1px' }}>{campaign.title}</Paragraph>
            <Box flex="1">
              <Text color="dark-4" size="xsmall" margin={{ horizontal: '11px', vertical: '1px' }} as="div" truncate>
                {window.location.origin}
                /
                {campaignId}
              </Text>
            </Box>
          </Box>
        </div>
        <Box>
          <Content />
        </Box>
      </Box>
    </Step>
  );
}

export default CampaignConversationStep;
