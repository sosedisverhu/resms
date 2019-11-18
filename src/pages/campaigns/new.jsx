import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { firestore } from '../../helpers/firebase';

function NewCampaign() {
  const router = useRouter();

  useEffect(async () => {
    const { id } = firestore.collection('campaigns').doc();

    await firestore
      .doc(`campaigns/${id}`)
      .set({
        createdAt: +new Date(),
        content: [],
        settings: {},
      });

    router.push(`/campaigns/${id}/message`);
  }, []);


  return <div />;
}

export default NewCampaign;
