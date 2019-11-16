import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';

import StepHeader from './StepHeader';
import StepFooter from './StepFooter';

function Step({ children, ...props }) {
  return (
    <>
      <Box overflow="auto" height="100vh" background="light-2">
        <Box justify="between" pad="large" gap="medium" style={{ minHeight: '100vh' }}>
          <StepHeader {...props} />
          <div style={{ paddingBottom: 80 }}>{children}</div>
          <div />
        </Box>
      </Box>
      <StepFooter {...props} />
    </>
  );
}

Step.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Step;
