import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  Box,
} from 'grommet';
import useCampaign from '../hooks/useCampaign';

import TextAreaAutoresize from './TextAreaAutoresize';
import updateCampaign from '../helpers/firebase/updateCampaign';

const CampaignMessage = ({ isActive }) => {
  const { campaign, campaignId } = useCampaign();
  const [value, setValue] = useState('');

  const onChangeHandler = useCallback((event) => setValue(event.target.value), []);
  const onBlurHandler = useCallback(
    (event) => updateCampaign(campaignId, { message: event.target.value }), [],
  );

  useEffect(() => {
    if (campaign) {
      setValue(campaign.message || '');
    }
  }, [campaign]);

  return (
    <Box round="large" background={isActive ? 'brand' : 'white'}>
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
};

CampaignMessage.propTypes = {
  isActive: PropTypes.bool.isRequired,
};

export default CampaignMessage;
