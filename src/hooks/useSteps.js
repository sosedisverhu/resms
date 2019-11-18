import { useMemo } from 'react';
import buildSteps from '../helpers/buildSteps';

function useSteps(campaignId) {
  return useMemo(() => buildSteps(campaignId), [campaignId]);
}

export default useSteps;
