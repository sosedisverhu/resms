import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  Box,
} from 'grommet';
import useCampaign from '../../hooks/useCampaign';

import TextAreaAutoresize from '../TextAreaAutoresize';
import updateCampaign from '../../helpers/firebase/updateCampaign';

function Text({ blockIndex }) {
  const { campaign, campaignId } = useCampaign();
  const block = campaign ? campaign.content[blockIndex] : null;
  const [value, setValue] = useState('');

  const onChangeHandler = useCallback((event) => setValue(event.target.value), []);
  const onBlurHandler = useCallback((event) => {
    campaign.content[blockIndex].value = event.target.value;

    return updateCampaign(campaignId, { content: campaign.content });
  }, [campaign, blockIndex]);

  useEffect(() => {
    if (block) {
      setValue(block.value);
    }
  }, [block]);

  return (
    <Box round="large" background={!value ? 'brand' : 'white'}>
      <TextAreaAutoresize
        size="small"
        plain
        resize={false}
        placeholder="Type your message here..."
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
        value={value}
      />
    </Box>
  );
}

Text.propTypes = {
  blockIndex: PropTypes.number.isRequired,
};

export default Text;
