import React from 'react';
import PropTypes from 'prop-types';
import { Box, Layer } from 'grommet';

import StepHeader from './StepHeader';
import StepFooter from './StepFooter';

function Step({ children, ...props }) {
  return (
    <Layer>
      <Box width="medium" overflow='scroll' justify="between" pad="large" gap="medium" style={{ minHeight: '80vh' }}>
        <StepHeader {...props} />
        <div>{children}</div>
        <Box height="80px" />
      </Box>
      <StepFooter {...props} />
    </Layer>
  );
}

Step.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Step;
