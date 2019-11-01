import React, { useState, useEffect } from 'react';

import { useRouter } from 'next/router';

import noop from 'lodash/noop';

import Step from '../../../components/Step';

import { firestore } from '../../../helpers/firebase';

const CampaignMessageStep = () => {
  const router = useRouter();
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [campaignNotFound, setCampaignStatus] = useState(false);

  useEffect(() => {
    if (router.query.id) {
      return firestore
        .collection('campaigns')
        .doc(router.query.id)
        .onSnapshot((doc) => {
          const data = doc.data();

          if (!data) {
            return setCampaignStatus(true);
          }

          setSubmitDisabled(true);
        });
    }
    return noop;
  }, [router.query.id]);

  return (
    <Step
      backUrl={{ showed: true, title: 'Edit message', href: `/campaigns/${router.query.id}/message` }}
      submitDisabled={submitDisabled}
      // onSubmit={onSubmitHandler}
      header={{
        step: 2,
        title: 'Build conversation',
        description: 'The conversation you\'re about to build is happening after recipient clicks a link in the original SMS.',
      }}
    >

    </Step>
  );
};

export default CampaignMessageStep;
