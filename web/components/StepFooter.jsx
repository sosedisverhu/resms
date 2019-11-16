import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Box, Button } from 'grommet';

import useCurrentCampaign from '../hooks/useCurrentCampaign';
import useStep from '../hooks/useStep';

function StepFooter({ step }) {
  const [campaign] = useCurrentCampaign();
  const {
    onBack, onSubmit, canSubmit, submitLabel, backLabel,
  } = useStep(campaign.id, step);
  const isContinueDisabled = useMemo(() => canSubmit && !canSubmit(campaign), [
    canSubmit,
    campaign,
  ]);

  return (
    <Box
      direction="row"
      justify="between"
      align="center"
      pad={{ horizontal: 'large', vertical: 'medium' }}
      width="100%"
      background="white"
      style={{
        position: 'absolute',
        bottom: 0,
        zIndex: 1,
      }}
      elevation="large"
    >
      {onBack ? <Button label={backLabel || 'Back'} onClick={onBack} /> : <span />}
      {onSubmit ? (
        <Button
          disabled={isContinueDisabled}
          primary
          label={submitLabel || 'Continue'}
          onClick={onSubmit}
        />
      ) : (
        <span />
      )}
    </Box>
  );
}

StepFooter.propTypes = {
  step: PropTypes.number.isRequired,
};

export default StepFooter;
