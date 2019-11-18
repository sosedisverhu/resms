import useSteps from './useSteps';

function useStep(campaignId, step) {
  const steps = useSteps(campaignId);
  return steps[step] || {};
}

export default useStep;
