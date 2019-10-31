import React, { useState, useEffect } from 'react';

import { useRouter } from 'next/router';

import firestore from '../../../helpers/firebase';

import Step from '../../../components/step'

const Campaign = () => {
  const router = useRouter();
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [campaign, setCampaign] = useState(null);
  const [campaignNotFound, setCampaignStatus] = useState(false);

  useEffect(() => {
    if (router.query.id) {
      return firestore.collection('campaigns')
        .doc(router.query.id)
        .onSnapshot((doc) => {
          const data = doc.data();

          if (!data) {
            return setCampaignStatus(true);
          }

          return setCampaign(data);
        });
    }
  }, [router.query.id]);

  return (
    <div>
      <Step
        backUrl={{ showed: false }}
        submitDisabled={submitDisabled}
      >

      </Step>
    </div>
  );
};

export default Campaign;
