import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Link from 'next/link';

import {
  Box, Text, TextInput, Button,
} from 'grommet';
import useCampaign from '../hooks/useCampaign';
import updateCampaign from '../helpers/firebase/updateCampaign';

const CampaignOpenGraph = ({ activity }) => {
  const { campaign, campaignId } = useCampaign();
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');

  const onImageChangeHandler = useCallback(
    () => updateCampaign(campaignId, { image: 'file' }), [],
  );
  const onChangeHandler = useCallback((event) => setTitle(event.target.value), []);
  const onBlurHandler = useCallback(
    (event) => updateCampaign(campaignId, { title: event.target.value }), [campaignId],
  );

  useEffect(() => {
    if (campaign) {
      setImage(campaign.image);
      setTitle(campaign.title || '');
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
          value={title}
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
  }).isRequired,
};

export default CampaignOpenGraph;
