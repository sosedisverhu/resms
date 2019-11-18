import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';

import StepHeader from './StepHeader';
import StepFooter from './StepFooter';

function Step({ children, ...props }) {
  return (
    <>
      <Box justify="between" pad="large" gap="medium" style={{ minHeight: '80vh' }}>
        <StepHeader {...props} />
        <div>{children}</div>
        <Box height="80px" />
      </Box>
      <StepFooter {...props} />
    </>
  );
}

Step.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Step;
