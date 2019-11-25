import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import isUndefined from 'lodash/isUndefined';

import useCurrentCampaignAttribute from '../hooks/useCurrentCampaignAttribute';

const RootBox = styled.span`
  border-radius: 17.5px;
  position: relative;
  overflow: hidden;
  max-width: 70vw;
  background: white;
`;

const Box = styled(RootBox)`  
  background-color: #E5E6EA
  position: relative;
  font-size: 15px;
  line-height: 18px;
  width: fit-content;
  display: flex;
  align-items: flex-start;
  letter-spacing: -0.016em;
  color: #000000;
`;

const Image = styled.img`
  width: 150px;
`;

function DisplayBlockImage({ blockIndex }) {
  const [image] = useCurrentCampaignAttribute(
    isUndefined(blockIndex) ? 'image' : ['content', blockIndex, 'value'],
  );

  return (
    <RootBox>
      <Box>
        <div style={{ paddingTop: '100%' }} />
        <Image src={image} />
      </Box>
    </RootBox>
  );
}

DisplayBlockImage.propTypes = {
  blockIndex: PropTypes.number.isRequired,
};

export default DisplayBlockImage;
