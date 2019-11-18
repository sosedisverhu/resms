import React from 'react';
import blocks from '../constants/blocks';

function CampaignBlocksList({ items = [], ItemComponent, ...itemProps }) {
  return (
    <div>
      {items.map((block, i) => {
        const Component = blocks[block.type];

        if (!Component) {
          return null;
        }

        return <ItemComponent key={i} index={i} blockIndex={i} {...{ Component }} {...itemProps} />;
      })}
    </div>
  );
}

export default CampaignBlocksList;
