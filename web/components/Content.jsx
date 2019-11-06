import React, { useState, useCallback, useEffect } from 'react';

import findIndex from 'lodash/findIndex';

import {
  Box, Button, Layer,
} from 'grommet';
import { Add } from 'grommet-icons';
import BlocksPopup from './BlocksPopup';
import useCampaign from '../hooks/useCampaign';
import blocksMap from './blocks/blocksMap';

const getActiveBlockIndex = (content) => findIndex(
  content, (block) => !block.value,
);

function Content() {
  const [activeBlockIndex, setActiveBlockIndex] = useState(-1);
  const { campaign } = useCampaign();
  const [popupShowed, setPopupShowed] = useState();
  const onBlockAddHandler = useCallback(() => setPopupShowed(true), []);
  const onBlockModalCloseHandler = useCallback(() => setPopupShowed(false), []);

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
      setActiveBlockIndex(getActiveBlockIndex(campaign.content, campaign));
    }
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
            onFocus={onFocus}
            onBlur={onBlur}
            isActive={activeBlockIndex === i}
          />
        );
      })}
      <Box align="start">
        {
          campaign.content.every((block) => !!block.value) && (
            <Button
              icon={<Add />}
              label="Add block"
              onClick={onBlockAddHandler}
              primary
            />
          )
        }
      </Box>
      {popupShowed && (
      <Layer
        background="transparent"
        overflow="hidden"
        position="bottom"
        margin={{ top: 'xlarge' }}
        onClickOutside={onBlockModalCloseHandler}
        onEsc={onBlockModalCloseHandler}
        responsive={false}
        round="large"
        full
      >
        <BlocksPopup onSelect={onBlockModalCloseHandler} />
      </Layer>
      )}
    </Box>
  );
}

export default Content;
