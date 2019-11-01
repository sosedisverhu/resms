import React, { useState, useEffect, useCallback } from 'react';

import { useRouter } from 'next/router';


import noop from 'lodash/noop';

import {
  Box, Text,
} from 'grommet';
import Content from '../../../components/Content';
import Step from '../../../components/Step';

import { firestore } from '../../../helpers/firebase';

const initialCampaignInfo = {
  message: '',
  image: '',
  title: '',
};

const CampaignMessageStep = () => {
  const router = useRouter();
  const [campaignInfo, setCampaignInfo] = useState(initialCampaignInfo);
  const [content, setContent] = useState([]);
  const [campaignNotFound, setCampaignStatus] = useState(false);

  const onChangeHandler = useCallback((newContent) => {
    setContent(newContent);
  }, []);
  const onSubmitHandler = useCallback(() => {
    const { id } = router.query;

    firestore
      .collection('campaigns')
      .doc(id)
      .update({
        content: content.map((block) => ({
          id: block.id,
          type: block.type,
          value: block.value,
        })),
      });
  }, [content]);

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

          setContent(data.content);
          return setCampaignInfo({
            message: data.message,
            image: data.image,
            title: data.title,
          });
        });
    }
    return noop;
  }, [router.query.id]);

  return (
    <Step
      backUrl={{ showed: true, title: 'Edit message', href: `/campaigns/${router.query.id}/message` }}
      submitDisabled={!content.length || content.some((block) => !block.value)}
      onSubmit={onSubmitHandler}
      header={{
        step: 2,
        title: 'Build conversation',
        description: 'The conversation you\'re about to build is happening after recipient clicks a link in the original SMS.',
      }}
    >
      <Box gap="medium" width="70vw">
        <Box round="large" background="white" pad="11px">
          <Text size="small" weight="bold">{campaignInfo.message}</Text>
        </Box>
        <Box round="large" overflow="hidden">
          <Box
            height="50vw"
            align="center"
            justify="center"
            background="light-1"
          >
            <Text color="dark-4" size="small">
              Select an image...
            </Text>
          </Box>
          <Box background="white">
            <Text size="xsmall" weight="bold" margin="11px">{campaignInfo.title}</Text>
            <Box pad={{ horizontal: 'medium', bottom: 'medium' }}>
              <Text color="dark-4" size="xsmall">
                resms.io/am1a
              </Text>
            </Box>
          </Box>
        </Box>
        <Box>
          <Content content={content} onChange={onChangeHandler} />
        </Box>
      </Box>
    </Step>
  );
};

export default CampaignMessageStep;
