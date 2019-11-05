import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import noop from 'lodash/noop';

import {
  Grid, Box, Heading, Text,
} from 'grommet';
import {
  Chat,
  Image,
  Video,
  Map,
  Calendar,
  Attachment,
  Code,
  Currency,
  Emoji,
  Gallery,
  Link,
  Microphone,
  Youtube,
  Vimeo,
  Instagram,
} from 'grommet-icons';

import useCampaign from '../hooks/useCampaign';

import updateCampaign from '../helpers/firebase/updateCampaign';

const blocks = [
  { type: 'text', label: 'Text', icon: Chat },
  { type: 'image', label: 'Image', icon: Image },
  { type: 'video', label: 'Video', icon: Video },
  { type: 'location', label: 'Location', icon: Map },
  { type: 'event', label: 'Event', icon: Calendar },
  { type: 'file', label: 'File', icon: Attachment },
  { type: 'frame', label: 'Frame', icon: Code },
  { type: 'payment', label: 'Payment', icon: Currency },
  { type: 'gif', label: 'GIF', icon: Emoji },
  { type: 'gallery', label: 'Gallery', icon: Gallery },
  { type: 'link', label: 'Link', icon: Link },
  { type: 'recording', label: 'Recording', icon: Microphone },
  { type: 'youtube', label: 'Youtube', icon: Youtube },
  { type: 'vimeo', label: 'Vimeo', icon: Vimeo },
  { type: 'instagram', label: 'Instagram', icon: Instagram },
];

const BlocksPopup = ({ onSelect }) => {
  const { campaign, campaignId } = useCampaign();
  const onBlockAddHandler = useCallback((type) => () => {
    updateCampaign(campaignId, {
      content: [
        ...campaign.content,
        { type },
      ],
    });
    onSelect();
  }, [campaign]);

  return (
    <Box
      background="light-2"
      width="100%"
      pad="large"
      overflow="auto"
      fill
    >
      <Heading
        size="small"
        margin={{ top: 'none', bottom: 'medium' }}
      >
        Select block type
      </Heading>
      <Text
        size="xsmall"
        color="dark-4"
      >
        There are many different block types that serve different purpose.
        Feel free to experiment with various blocks to gets best results.
      </Text>
      <Box>
        <Grid
          columns={{
            count: 3,
            size: 'auto',
          }}
          gap="small"
        >
          { blocks.map((block) => {
            const Icon = block.icon;

            return (
              <Box
                key={block.type}
                background="light-1"
                justify="center"
                align="center"
                round="medium"
                pad="medium"
                onClick={onBlockAddHandler(block.type)}
              >
                <Icon size="large" color="brand" />
                <Text color="brand">{block.label}</Text>
              </Box>
            );
          }) }
        </Grid>
      </Box>
    </Box>
  );
};

BlocksPopup.propTypes = {
  onSelect: PropTypes.func,
};

BlocksPopup.defaultProps = {
  onSelect: noop,
};

export default BlocksPopup;
