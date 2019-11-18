import React from 'react';
import PropTypes from 'prop-types';
import isUndefined from 'lodash/isUndefined';

import {
  Box, Text, Button, Image,
} from 'grommet';

import useCurrentCampaignAttribute from '../hooks/useCurrentCampaignAttribute';
import CampaignLink from './CampaignLink';

function DisplayBlockOpenGraph({ blockIndex }) {
  const [image] = useCurrentCampaignAttribute(
    isUndefined(blockIndex) ? 'image' : ['content', blockIndex, 'image'],
  );

  const [title] = useCurrentCampaignAttribute(
    isUndefined(blockIndex) ? 'title' : ['content', blockIndex, 'title'],
  );

  return (
    <Box
      round="large"
      overflow="hidden"
      background="white"
      elevation="xsmall"
      width={{ max: '70vw' }}
    >
      <Button>
        <Box background={image ? 'brand' : 'light-1'} style={{ position: 'relative' }}>
          <>
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
          </>
        </Box>
      </Button>
      <Box style={{ position: 'relative' }}>
        <Box pad="medium">
          <Text weight="bold">{title}</Text>
        </Box>
        <Box pad={{ horizontal: 'medium', bottom: 'medium' }}>
          <CampaignLink color="dark-4" size="xsmall" truncate />
        </Box>
      </Box>
    </Box>
  );
}

DisplayBlockOpenGraph.propTypes = {
  blockIndex: PropTypes.number,
};

export default DisplayBlockOpenGraph;
