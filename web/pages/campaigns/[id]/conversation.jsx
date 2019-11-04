import React from 'react';

import {
  Box, Text,
} from 'grommet';
import Link from 'next/link';
import isNull from 'lodash/isNull';
import Content from '../../../components/Content';
import Step from '../../../components/Step';

import getCampaign from '../../../hooks/getCampaign';

const CampaignConversationStep = () => {
  const { campaign, campaignId } = getCampaign();

  if (isNull(campaign)) {
    return <Text>Loading</Text>;
  }

  if (!campaign) {
    return <Text>Campaign not found</Text>;
  }

  return (
    <Step
      backUrl={{ showed: true, title: 'Edit message', href: `/campaigns/${campaignId}/message` }}
      submitDisabled={!campaign.content.length || campaign.content.some((block) => !block.value)}
      submitHref={`/campaigns/${campaignId}/customization`}
      step={2}
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
            <Text color="dark-4" size="small">
              Select an image...
            </Text>
          </Box>
          <Box background="white">
            <Text size="xsmall" weight="bold" margin="11px">{campaign.title}</Text>
            <Box pad={{ horizontal: 'medium', bottom: 'medium' }}>
              <Text color="dark-4" size="xsmall">
                <Link href="resms.io/am1a">
                  <a>resms.io/am1a</a>
                </Link>
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
};

export default CampaignConversationStep;
