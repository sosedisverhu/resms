import React from 'react';
import styled from 'styled-components';

const Box1 = styled.div`
  margin-bottom: 6px;
`;

function DisplayCampaignBlocksListItem({ Component, blockIndex, isLast }) {
  return (
    <Box1>
      <Component blockIndex={blockIndex} isLast={isLast} />
    </Box1>
  );
}

export default DisplayCampaignBlocksListItem;
