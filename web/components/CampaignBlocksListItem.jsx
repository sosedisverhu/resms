import React from 'react';
import { Box } from 'grommet';
import { Close } from 'grommet-icons';
import { SortableHandle } from 'react-sortable-hoc';
import useCurrentCampaignBlockActions from '../hooks/useCurrentCampaignBlockActions';
import CampaignBlocksListItemDragHandle from './CampaignBlocksListItemDragHandle';

const SortableCampaignBlocksListItemDragHandle = SortableHandle(CampaignBlocksListItemDragHandle);

function CampaignBlocksListItem({ Component, blockIndex }) {
  const { remove } = useCurrentCampaignBlockActions(blockIndex);

  return (
    <Box
      align="center"
      direction="row"
      margin={{ bottom: 'small' }}
      style={{ position: 'relative', userSelect: 'none' }}
    >
      <Box fill style={{ position: 'relative' }}>
        <Component blockIndex={blockIndex} />
      </Box>

      <SortableCampaignBlocksListItemDragHandle />

      <Box
        margin="small"
        style={{ position: 'absolute', left: '100%', top: 'calc(50% - 24px / 2)' }}
      >
        <Close size="small" onClick={remove} />
      </Box>
    </Box>
  );
}

export default CampaignBlocksListItem;
