import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';
import isUndefined from 'lodash/isUndefined';
import useCurrentCampaignAttribute from '../hooks/useCurrentCampaignAttribute';

function DisplayBlockText({ blockIndex }) {
  const [text] = useCurrentCampaignAttribute(
    isUndefined(blockIndex) ? 'message' : ['content', blockIndex, 'value'],
  );

  return (
    <Box align="start" style={{ position: 'relative' }}>
      <Box round="large" background="white" elevation="xsmall" pad="medium">
        <Text weight="bold">{text}</Text>
      </Box>
    </Box>
  );
}

DisplayBlockText.propTypes = {
  blockIndex: PropTypes.number,
};

export default DisplayBlockText;
