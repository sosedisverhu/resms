import React from 'react';
import displayBlocks from '../constants/displayBlocks';

function DisplayCampaignBlocksList({ items = [], ItemComponent, ...itemProps }) {
  return (
    <div>
      {items.map((block, i) => {
        const Component = displayBlocks[block.type];

        if (!Component) {
          return null;
        }

        return (
          <ItemComponent
            key={i}
            index={i}
            blockIndex={i}
            isLast={items.length - 1 === i}
            {...{ Component }} {...itemProps}
          />
        );
      })}
    </div>
  );
}

export default DisplayCampaignBlocksList;
