import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Text,
  CheckBox,
} from 'grommet';

import useCampaign from '../hooks/useCampaign';
import updateCampaign from '../helpers/firebase/updateCampaign';

function CustomizationCheckBox({ type, title, description }) {
  const { campaign, campaignId } = useCampaign();

  const [checked, setChecked] = useState(false);
  const onChange = useCallback((event) => {
    setChecked(event.target.checked);
    updateCampaign(campaignId, {
      settings: {
        ...campaign.settings,
        [type]: event.target.checked,
      },
    });
  }, [campaign]);

  useEffect(() => {
    if (campaign) {
      setChecked(campaign.settings[type] || false);
    }
  }, [campaign]);

  return (
    <Box direction="row" gap="medium">
      <CheckBox reverse checked={checked} onChange={onChange} background="white" toggle />
      <Box>
        <Text color="dark-1" size="small">{title}</Text>
        <Text color="dark-4" size="xsmall">{description}</Text>
      </Box>
    </Box>
  );
}

CustomizationCheckBox.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default CustomizationCheckBox;
