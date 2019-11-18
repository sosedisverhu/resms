import React from 'react';
import PropTypes from 'prop-types';

import { Heading, Text } from 'grommet';

import useRouteParams from '../hooks/useRouteParams';
import useStep from '../hooks/useStep';

function StepHeader({ step }) {
  const { id: campaignId } = useRouteParams();
  const { title, description } = useStep(campaignId, step);

  return (
    <div>
      <Text color="dark-4" size="small">
        STEP
        {' '}
        {step + 1}
      </Text>
      <Heading size="small" margin={{ top: 'small', bottom: 'small' }}>
        {title}
      </Heading>
      <Text color="dark-4" size="small">
        {description}
      </Text>
    </div>
  );
}

StepHeader.propTypes = {
  step: PropTypes.number.isRequired,
};

export default StepHeader;
