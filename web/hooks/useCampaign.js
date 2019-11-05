import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import noop from 'lodash/noop';
import { firestore } from '../helpers/firebase';

export default () => {
  const {
    query: { id: campaignId },
  } = useRouter();
  const [campaign, setCampaign] = useState(null);

  useEffect(() => {
    if (campaignId) {
      return firestore
        .collection('campaigns')
        .doc(campaignId)
        .onSnapshot((doc) => {
          const data = doc.data();

          if (!data) {
            return setCampaign(false);
          }

          return setCampaign({ ...data });
        });
    }
    return noop;
  }, [campaignId]);

  return { campaign, campaignId };
};
