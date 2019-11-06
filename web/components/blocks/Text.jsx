import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  Grommet,
  Box,
} from 'grommet';
import useCampaign from '../../hooks/useCampaign';

import TextAreaAutoresize from '../TextAreaAutoresize';
import updateCampaign from '../../helpers/firebase/updateCampaign';

const inputStyles = {
  transition: 'background-color 150ms',
  borderRadius: '24px',
};
const activeInputTheme = {
  textArea: {
    extend: () => ({
      ...inputStyles,
      backgroundColor: '#7d4cdb',
    }),
  },
};
const inputTheme = {
  textArea: {
    extend: () => ({
      ...inputStyles,
      backgroundColor: '#fff',
    }),
  },
};

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
    <Box round="large">
      <Grommet theme={!value ? activeInputTheme : inputTheme}>
        <TextAreaAutoresize
          size="small"
          plain
          resize={false}
          placeholder="Type your message here..."
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
          value={value}
        />
      </Grommet>
    </Box>
  );
}

Text.propTypes = {
  blockIndex: PropTypes.number.isRequired,
};

export default Text;
