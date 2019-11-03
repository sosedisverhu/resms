import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { firestore } from '../../helpers/firebase';

const NewCampaign = () => {
  const router = useRouter();

  useEffect(() => {
    const { id } = firestore.collection('campaigns').doc();

    firestore
      .doc(`campaigns/${id}`)
      .set({
        createdAt: +new Date(),
        content: [],
      })
      .then(() => {
        router.push(`/campaigns/${id}/message`);
      });
  }, []);


  return <div />;
};

export default NewCampaign;
