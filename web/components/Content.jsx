import React, { useState, useCallback, useEffect } from 'react';

import findIndex from 'lodash/findIndex';

import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';

import {
  Box, Button,
} from 'grommet';
import { Add, Menu, Close } from 'grommet-icons';
import BlocksPopup from './BlocksPopup';
import useCampaign from '../hooks/useCampaign';
import updateCampaign from '../helpers/firebase/updateCampaign';

import arrayMove from '../utils/arrayMove';

import blocksMap from './blocks/blocksMap';

const getActiveBlockIndex = (content) => findIndex(
  content, (block) => !block.value,
);

const ReorderIcon = SortableHandle(() => (
  <Menu />
));

const ComponentSortable = SortableElement(({
  Component, blockIndex, onFocus, onBlur, onRemove, activeBlockIndex,
}) => (
  <div>
    <ReorderIcon />
    <Close onClick={onRemove(blockIndex)} />
    <Component
      blockIndex={blockIndex}
      onFocus={onFocus}
      onBlur={onBlur}
      isActive={activeBlockIndex === blockIndex}
    />
  </div>
));

const Blocks = SortableContainer((
  {
    blocks,
    onFocus,
    onBlur,
    onRemove,
    activeBlockIndex,
  },
) => (
  <div>
    {blocks.map((block, i) => {
      const Component = blocksMap[block.type];

      if (!Component) {
        return null;
      }

      return (
        <ComponentSortable
          Component={Component}
          key={i}
          index={i}
          blockIndex={i}
          onFocus={onFocus}
          onBlur={onBlur}
          onRemove={onRemove}
          activeBlockIndex={activeBlockIndex}
        />
      );
    })}
  </div>
));


function Content() {
  const [activeBlockIndex, setActiveBlockIndex] = useState(-1);
  const { campaignId, campaign } = useCampaign();
  const [popupVisible, setPopupVisible] = useState();
  const onBlockAddHandler = useCallback(() => setPopupVisible(true), []);
  const onBlockModalCloseHandler = useCallback(() => setPopupVisible(false), []);

  const onReorder = useCallback(({ oldIndex, newIndex }) => {
    updateCampaign(campaignId, { content: arrayMove(campaign.content, oldIndex, newIndex) });
  }, [campaign]);
  const onRemove = useCallback((blockIndex) => () => {
    const content = [...campaign.content];

    content.splice(blockIndex, 1);
    updateCampaign(campaignId, { content });
  }, [campaign]);
  const onFocus = useCallback((blockIndex) => {
    const content = [...campaign.content];
    content.splice(blockIndex, 1);
    const activeBlockI = getActiveBlockIndex(content);

    setActiveBlockIndex(activeBlockI >= blockIndex ? activeBlockI + 1 : activeBlockI);
  }, [campaign]);
  const onBlur = useCallback((blockIndex, value) => {
    const content = [...campaign.content];

    content[blockIndex].value = value;
    setActiveBlockIndex(
      getActiveBlockIndex(content),
    );
  }, [campaign]);

  useEffect(() => {
    if (campaign) {
      setActiveBlockIndex(getActiveBlockIndex(campaign.content));
    }
  }, [campaign]);

  if (!campaign) {
    return null;
  }

  return (
    <Box gap="medium">
      <Blocks
        blocks={campaign.content}
        onFocus={onFocus}
        onBlur={onBlur}
        onRemove={onRemove}
        activeBlockIndex={activeBlockIndex}
        axis="xy"
        useDragHandle
        onSortEnd={onReorder}
      />
      <Box align="start">
        {
          campaign.content.every((block) => !!block.value) && (
            <Button
              margin={{ bottom: 'xsmall' }}
              icon={<Add />}
              label="Add block"
              onClick={onBlockAddHandler}
              primary={!campaign.content.length}
            />
          )
        }
      </Box>
      <BlocksPopup visible={popupVisible} onClose={onBlockModalCloseHandler} />
    </Box>
  );
}

export default Content;
