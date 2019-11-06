import React, { useCallback } from 'react';

import {
  Box, Button,
} from 'grommet';
import { Add } from 'grommet-icons';
import useCampaign from '../hooks/useCampaign';
import blocksMap from './blocks/blocksMap';
import updateCampaign from '../helpers/firebase/updateCampaign';

const DEFAULT_BLOCK = {
  type: 'text',
  value: '',
};

function Content() {
  const { campaign, campaignId } = useCampaign();
  const onBlockAddHandler = useCallback(() => {
    updateCampaign(campaignId, {
      content: [
        ...campaign.content,
        DEFAULT_BLOCK,
      ],
    });
  }, [campaign]);

  if (!campaign) {
    return null;
  }

  return (
    <Box gap="medium">
      {campaign.content.map((block, i) => {
        const Component = blocksMap[block.type];

        if (!Component) {
          return null;
        }

        return (
          <Component
            key={i}
            blockIndex={i}
          />
        );
      })}
      <Box align="start">
        <Button
          icon={<Add />}
          label="Add block"
          primary={!!campaign.content.length}
          onClick={onBlockAddHandler}
        />
      </Box>
    </Box>
  );
}

export default Content;
