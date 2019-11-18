import React from 'react';
import PropTypes from 'prop-types';

import {
  Image, Box,
} from 'grommet';

import isUndefined from 'lodash/isUndefined';

import useCurrentCampaignAttribute from '../hooks/useCurrentCampaignAttribute';

function DisplayBlockImage({ blockIndex }) {
  const [image] = useCurrentCampaignAttribute(
    isUndefined(blockIndex) ? 'image' : ['content', blockIndex, 'value'],
  );

  return (
    <Box round="large" overflow="hidden" elevation="xsmall" width={{ max: '70vw' }}>
      <Box background="light-1" style={{ position: 'relative' }}>
        <div style={{ paddingTop: '100%' }} />
        <Image
          fit="cover"
          src={image}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            width: '100%',
            height: '100%',
          }}
        />
      </Box>
    </Box>
  );
}

DisplayBlockImage.propTypes = {
  blockIndex: PropTypes.number.isRequired,
};

export default DisplayBlockImage;
