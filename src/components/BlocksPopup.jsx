import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import noop from 'lodash/noop';

import {
  Grid, Box, Heading, Text, Layer,
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

import BlockPreviewCard from './BlockPreviewCard';
import useCurrentCampaign from '../hooks/useCurrentCampaign';
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

function BlocksPopup({ onClose, visible }) {
  const [campaign] = useCurrentCampaign();

  const onBlockAddHandler = useCallback(
    (type) => {
      updateCampaign(campaign.id, {
        content: [...campaign.content, { type }],
      });
      onClose();
    },
    [campaign, onClose],
  );

  if (!visible) {
    return null;
  }

  return (
    <Layer
      background="transparent"
      overflow="hidden"
      position="bottom"
      margin={{ top: 'xlarge' }}
      onClickOutside={onClose}
      onEsc={onClose}
      responsive={false}
      round="large"
      full
    >
      <Box background="light-2" width="100%" pad="large" overflow="auto" fill>
        <Heading size="small" margin={{ top: 'none', bottom: 'medium' }}>
          Select block type
        </Heading>
        <Text size="xsmall" color="dark-4">
          There are many different block types that serve different purpose. Feel free to experiment
          with various blocks to gets best results.
        </Text>
        <Box margin={{ top: 'large' }}>
          <Grid
            columns={{
              count: 3,
              size: 'auto',
            }}
            gap="small"
          >
            {blocks.map((block) => (
              <BlockPreviewCard
                key={block.type}
                type={block.type}
                label={block.label}
                icon={block.icon}
                onBlockAdd={onBlockAddHandler}
              />
            ))}
          </Grid>
        </Box>
      </Box>
    </Layer>
  );
}

BlocksPopup.propTypes = {
  onClose: PropTypes.func,
  visible: PropTypes.bool,
};

BlocksPopup.defaultProps = {
  onClose: noop,
  visible: false,
};

export default BlocksPopup;
