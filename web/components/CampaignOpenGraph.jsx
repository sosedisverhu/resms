import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import getCampaign from '../hooks/getCampaign';

import Link from 'next/link';

import {
  Box, Text, TextInput, Button,
} from 'grommet';
import updateCampaign from '../helpers/firebase/updateCampaign';

const CampaignOpenGraph = ({ activity }) => {
  const { campaign, campaignId } = getCampaign();
  const [value, setValue] = useState({ image: '', title: '' });

  const onImageChangeHandler = useCallback(
    () => updateCampaign(campaignId, { image: 'file' }), [],
  );
  const onChangeHandler = useCallback((event) => setValue(event.target.value), []);
  const onBlurHandler = useCallback(
    (event) => updateCampaign(campaignId, { title: event.target.value }), [],
  );

  useEffect(() => {
    if (campaign) {
      setValue({
        image: campaign.image,
        title: campaign.title || '',
      });
    }
  }, [campaign]);

  return (
    <Box round="large" overflow="hidden">
      <Button>
        <label htmlFor="image">
          <Box
            height="50vw"
            align="center"
            justify="center"
            background={activity.image ? 'brand' : 'light-1'}
          >
            <input
              onChange={onImageChangeHandler}
              id="image"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
            />
            <Text color="dark-4" size="small">
              Select an image...
            </Text>
          </Box>
        </label>
      </Button>
      <Box background={activity.title ? 'brand' : 'white'}>
        <TextInput
          plain
          size="xsmall"
          placeholder="Type your call to action here..."
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
          value={value.title}
        />
        <Box pad={{ horizontal: 'medium', bottom: 'medium' }}>
          <Text color="dark-4" size="xsmall">
            <Link href="resms.io/am1a">
              <a>resms.io/am1a</a>
            </Link>
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

CampaignOpenGraph.propTypes = {
  activity: PropTypes.shape({
    image: PropTypes.bool.isRequired,
    title: PropTypes.bool.isRequired,
  }),
};

export default CampaignOpenGraph;
