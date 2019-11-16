import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import noop from 'lodash/noop';

import {
  Box, Text, TextInput, Button, Grommet, Image,
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
    async (event) => {
      const file = event.target.files[0];
      const uploadTask = storage.ref().child(`images/${file.name}`).put(file);

      uploadTask.on('state_changed',
        noop, noop, () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            updateCampaign(campaignId, { image: downloadURL });
            onBlur('image', downloadURL);
          });
        });
    }, [campaign],
  );
  const onFocusHandler = useCallback(() => onFocus('title'), [campaign]);
  const onChangeHandler = useCallback((event) => {
    if ((event.target.value && !campaign.title) || (!event.target.value && campaign.title)) {
      updateCampaign(campaignId, { title: event.target.value });
    }
    setTitle(event.target.value);
  }, [campaign, campaignId]);
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
            { image ? (
              <Box>
                <Image
                  width="100%"
                  src={image}
                />
              </Box>
            ) : (
              <Text color="dark-4" size="small">
                Select an image...
              </Text>
            ) }
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
          <Box pad={{ horizontal: 'medium', bottom: 'small' }}>
            <Text color="dark-4" size="xsmall" truncate>
              {window.location.origin}
              /
              {campaignId}
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
