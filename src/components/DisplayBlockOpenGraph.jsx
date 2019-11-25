import React from 'react';
import PropTypes from 'prop-types';
import isUndefined from 'lodash/isUndefined';
import styled from 'styled-components';

import useCurrentCampaignAttribute from '../hooks/useCurrentCampaignAttribute';
import CampaignLink from './CampaignLink';

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
  max-height: 175px;
  width: 150px;
`;

const ImageBox = styled(Box)`
  margin-bottom: 4px
`;

const LinkBox = styled(Box)`
  justify-content: start;
  flex-direction: column
  padding: 10px 14px;
`;

function DisplayBlockOpenGraph({ blockIndex }) {
  const [image] = useCurrentCampaignAttribute(
    isUndefined(blockIndex) ? 'image' : ['content', blockIndex, 'image'],
  );

  const [title] = useCurrentCampaignAttribute(
    isUndefined(blockIndex) ? 'title' : ['content', blockIndex, 'title'],
  );

  return (
    <RootBox>
      <div>
        <ImageBox>
          <>
            <div style={{ paddingTop: '100%' }} />
            <Image
              src={image}
            />
          </>
        </ImageBox>
      </div>
      <LinkBox>
        <span>{title}</span>
        <CampaignLink color="dark-4" size="xsmall" truncate />
      </LinkBox>
    </RootBox>
  );
}

DisplayBlockOpenGraph.propTypes = {
  blockIndex: PropTypes.number,
};

export default DisplayBlockOpenGraph;
