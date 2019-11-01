import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import noop from 'lodash/noop';

import {
  Box,
} from 'grommet';
import TextAreaAutoresize from '../TextAreaAutoresize';

const CampaignMessageStep = ({ onChange, value }) => {
  const onChangeHandler = useCallback((event) => onChange(event.target.value), []);

  return (
    <Box round="large" background={!value ? 'brand' : 'white'}>
      <TextAreaAutoresize
        size="small"
        plain
        resize={false}
        placeholder="Type your message here..."
        onChange={onChangeHandler}
        value={value}
      />
    </Box>
  );
};

CampaignMessageStep.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
};

CampaignMessageStep.defaultProps = {
  onChange: noop,
  value: '',
};

export default CampaignMessageStep;
