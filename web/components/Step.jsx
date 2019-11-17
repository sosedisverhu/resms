import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';

import StepHeader from './StepHeader';
import StepFooter from './StepFooter';

function Step({ children, ...props }) {
  return (
    <>
      <Box justify="between" pad="large" gap="medium" style={{ minHeight: '100vh' }}>
        <StepHeader {...props} />
        <div style={{ paddingBottom: 80 }}>{children}</div>
        <div />
      </Box>
      <StepFooter {...props} />
    </>
  );
}

Step.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Step;
