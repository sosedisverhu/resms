import pullAt from 'lodash/pullAt';
import update from 'lodash/update';
import { useCallback } from 'react';
import useCurrentCampaign from './useCurrentCampaign';

function useCurrentCampaignBlockActions(blockIndex) {
  const [campaign, setCampaign] = useCurrentCampaign();

  const remove = useCallback(() => {
    setCampaign(
      update(campaign, 'content', (content) => {
        pullAt(content, blockIndex);
        return content;
      }),
    );
  }, [campaign, blockIndex]);

  return { remove };
}

export default useCurrentCampaignBlockActions;
