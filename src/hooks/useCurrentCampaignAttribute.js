import get from 'lodash/get';
import set from 'lodash/set';
import { useCallback } from 'react';
import useCurrentCampaign from './useCurrentCampaign';

function useCurrentCampaignAttribute(path) {
  const [campaign, setCampaign] = useCurrentCampaign();
  const value = get(campaign, path);
  const setValue = useCallback(
    (newValue) => {
      setCampaign(set(campaign, path, newValue));
    },
    [campaign, path],
  );
  return [value, setValue];
}

export default useCurrentCampaignAttribute;
