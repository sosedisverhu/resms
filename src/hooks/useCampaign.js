import { useState, useEffect, useCallback } from 'react';
import noop from 'lodash/noop';
import { firestore } from '../helpers/firebase';
import useRouteParams from './useRouteParams';
import updateCampaign from '../helpers/firebase/updateCampaign';

export default (id = null) => {
  const { routeId } = useRouteParams();
  const [campaign, setCampaign] = useState();

  useEffect(() => {
    if (id) {
      return firestore
        .collection('campaigns')
        .doc(id || routeId)
        .onSnapshot((doc) => {
          const data = doc.data();

          if (!data) {
            return setCampaign(null);
          }

          return setCampaign({ id, ...data });
        });
    }
    return noop;
  }, [id, routeId]);

  const onChange = useCallback(
    (newCampaign) => {
      const { id: _id, ...attributes } = newCampaign;
      setCampaign(attributes);
      updateCampaign(id, attributes);
    },
    [id, campaign, setCampaign],
  );

  return [campaign, onChange];
};
