import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import isUndefined from 'lodash/isUndefined';
import useCurrentCampaignAttribute from '../hooks/useCurrentCampaignAttribute';

const RootBox = styled.span`
  border-radius: 17.5px;
  position: relative;
`;

const Box = styled(RootBox)`  
  background-color: #E5E6EA
  padding: 10px 14px;
  font-size: 15px;
  line-height: 18px;
  display: inline-block;
  align-items: flex-end;
  letter-spacing: -0.016em;
  color: #000000;
`;

const Text = styled.span`
  word-wrap: break-word;
  position: relative;

  &:before, &:after {
   ${(props) => props.isLast && css`
    content: '';
  `}
    position: absolute;
    bottom: -13px;
    height: 10px;
  }

  &:before {
    left: -23px;
    border-left:20px solid #E5E6EA;
    border-bottom-right-radius: 16px 14px;
    transform:translate(0, -2px);
  }

  &:after {
    left: -8px;
    width: 26px;
    background: white;
    border-bottom-right-radius: 10px;
    transform:translate(-30px, -2px);
  }
`;

function DisplayBlockText({ blockIndex, isLast }) {
  const [text] = useCurrentCampaignAttribute(
    isUndefined(blockIndex) ? 'message' : ['content', blockIndex, 'value'],
  );

  return (
    <RootBox>
      <Box>
        <Text isLast={isLast}>{text}</Text>
      </Box>
    </RootBox>
  );
}

DisplayBlockText.propTypes = {
  blockIndex: PropTypes.number,
  isLast: PropTypes.bool,
};

export default DisplayBlockText;
