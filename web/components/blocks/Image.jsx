import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  Image,
  Box, Button, Text,
} from 'grommet';

import noop from 'lodash/noop';

import useCampaign from '../../hooks/useCampaign';
import updateCampaign from '../../helpers/firebase/updateCampaign';

import { storage } from '../../helpers/firebase';

function ImageBlock({
  blockIndex,
  isActive,
}) {
  const { campaign, campaignId } = useCampaign();
  const block = campaign ? campaign.content[blockIndex] : null;
  const [value, setValue] = useState('');

  const onImageChangeHandler = useCallback(
    async (event) => {
      const file = event.target.files[0];
      const uploadTask = storage.ref().child(`images/${file.name}`).put(file);

      uploadTask.on('state_changed',
        noop, noop, () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            campaign.content[blockIndex].value = downloadURL;

            updateCampaign(campaignId, { content: campaign.content });
          });
        });
    }, [campaign],
  );

  useEffect(() => {
    if (block) {
      setValue(block.value);
    }
  }, [block]);

  return (
    <Box round="large" overflow="hidden">
      <Button>
        <label htmlFor="image">
          <Box
            align="center"
            justify="center"
            background={isActive ? 'brand' : 'light-1'}
          >
            <input
              onChange={onImageChangeHandler}
              id="image"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
            />
            { value ? (
              <Box width="100%" height="60vw">
                <Image
                  fit="cover"
                  src={value}
                />
              </Box>
            ) : (
              <Box width="100%" height="60vw" align="center" justify="center">
                <Text color="dark-4" size="small">
                  Select an image...
                </Text>
              </Box>
            ) }
          </Box>
        </label>
      </Button>
    </Box>
  );
}

ImageBlock.propTypes = {
  blockIndex: PropTypes.number.isRequired,
  isActive: PropTypes.bool,
};

ImageBlock.defaultProps = {
  isActive: false,
};

export default ImageBlock;
