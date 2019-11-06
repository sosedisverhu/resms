import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import noop from 'lodash/noop';

import {
  Box, Text, TextInput, Button, Grommet,
} from 'grommet';
import useCampaign from '../hooks/useCampaign';
import updateCampaign from '../helpers/firebase/updateCampaign';
import { storage } from '../helpers/firebase';

const boxStyles = {
  transition: 'background-color 150ms',
};
const activeBoxTheme = {
  box: {
    extend: () => ({
      ...boxStyles,
      backgroundColor: '#7d4cdb',
    }),
  },
};
const boxTheme = {
  box: {
    extend: () => ({
      ...boxStyles,
      backgroundColor: '#fff',
    }),
  },
};

function CampaignOpenGraph({ activity, onFocus, onBlur }) {
  const { campaign, campaignId } = useCampaign();
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');

  const onImageChangeHandler = useCallback(
    (event) => {
      const file = event.target.files[0];
      const ref = storage.ref().child(file.name);
      const url = ref.getDownloadURL();

      updateCampaign(campaignId, { image: 'file' });

      onBlur('image', 'file');
    }, [campaign],
  );
  const onFocusHandler = useCallback(() => onFocus('title'), [campaign]);
  const onChangeHandler = useCallback((event) => setTitle(event.target.value), []);
  const onBlurHandler = useCallback(
    (event) => {
      updateCampaign(campaignId, { title: event.target.value });
      onBlur('title', event.target.value);
    }, [campaign],
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
      <Grommet theme={activity.title ? activeBoxTheme : boxTheme}>
        <Box>
          <TextInput
            size="xsmall"
            placeholder="Type your call to action here..."
            onChange={onChangeHandler}
            onBlur={onBlurHandler}
            onFocus={onFocusHandler}
            value={title}
            plain
          />
          <Box pad={{ horizontal: 'medium', bottom: 'medium' }}>
            <Text color="dark-4" size="xsmall">
              resms.io/am1a
            </Text>
          </Box>
        </Box>
      </Grommet>
    </Box>
  );
}

CampaignOpenGraph.propTypes = {
  activity: PropTypes.shape({
    image: PropTypes.bool.isRequired,
    title: PropTypes.bool.isRequired,
  }).isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

CampaignOpenGraph.defaultProps = {
  onFocus: noop,
  onBlur: noop,
};

export default CampaignOpenGraph;
