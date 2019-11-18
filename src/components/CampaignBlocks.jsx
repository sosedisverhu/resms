import React, { useState, useCallback } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { Button } from 'grommet';
import { Add } from 'grommet-icons';

import BlocksPopup from './BlocksPopup';
import CampaignBlocksListItem from './CampaignBlocksListItem';
import CampaignBlocksList from './CampaignBlocksList';
import useCurrentCampaign from '../hooks/useCurrentCampaign';
import updateCampaign from '../helpers/firebase/updateCampaign';
import arrayMove from '../utils/arrayMove';
import CampaignInitialBlocks from './CampaignInitialBlocks';

const SortableCampaignBlocksListItem = SortableElement(CampaignBlocksListItem);
const SortableCampaignBlocksList = SortableContainer(CampaignBlocksList);

function CampaignBlocks() {
  const [campaign] = useCurrentCampaign();
  const [popupVisible, setPopupVisible] = useState();
  const onBlockAddHandler = useCallback(() => setPopupVisible(true), []);
  const onBlockModalCloseHandler = useCallback(() => setPopupVisible(false), []);

  const onSortEnd = useCallback(
    ({ oldIndex, newIndex }) => {
      updateCampaign(campaign.id, { content: arrayMove(campaign.content, oldIndex, newIndex) });
    },
    [campaign],
  );

  return (
    <div id="container">
      <CampaignInitialBlocks />

      <SortableCampaignBlocksList
        items={campaign.content}
        ItemComponent={SortableCampaignBlocksListItem}
        axis="y"
        useDragHandle
        helperContainer={document.getElementById('container')}
        {...{ onSortEnd }}
      />

      <div>
        <Button
          margin={{ bottom: 'medium' }}
          icon={<Add />}
          label="Add block"
          onClick={onBlockAddHandler}
          primary
        />
      </div>

      <BlocksPopup visible={popupVisible} onClose={onBlockModalCloseHandler} />
    </div>
  );
}

export default CampaignBlocks;
