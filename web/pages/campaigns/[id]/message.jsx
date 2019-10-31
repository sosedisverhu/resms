import React, { useState, useEffect } from 'react';

import { useRouter } from 'next/router';

import {
  Grommet,
  Box,
  Text,
  TextInput,
} from 'grommet';
import Step from '../../../components/Step';
import TextAreaAutoresize from '../../../components/TextAreaAutoresize';

import firestore from '../../../helpers/firebase';

const textAreaTheme = {
  textArea: {
    extend: () => ({
      // color: '#555555',
      // backgroundColor: '#ffffff', // filled styles for future
      color: '#ffffff',
      backgroundColor: '#7d4cdc',
      borderRadius: '18px',
      border: 'none',
      outline: 'none',
      boxShadow: 'none',
      fontSize: '14px',
      '::placeholder': {
        color: '#ffffff',
      },
    }),
  },
};

const fileBlockTheme = {
  box: {
    extend: () => ({
      backgroundColor: '#f8f8f8',
      borderTopRightRadius: '18px',
      borderTopLeftRadius: '18px',
      width: '100%',
      paddingTop: '100%',
      position: 'relative',
    }),
  },
  text: {
    extend: () => ({
      display: 'block',
      fontSize: '14px',
      position: 'absolute',
      top: '50%',
      left: '0',
      transform: 'translate(0, -50%)',
      width: '100%',
      textAlign: 'center',
      color: '#999999',
    }),
  },
};

const fileBlockTitleTheme = {
  box: {
    extend: () => ({
      // position: 'absolute',
      // bottom: '0',
      backgroundColor: '#ffffff',
      borderBottomRightRadius: '18px',
      borderBottomLeftRadius: '18px',
      width: '100%',
      height: '48px',
    }),
  },
  textInput: {
    extend: {
      color: '#999999',
      border: 'none',
      outline: 'none',
      boxShadow: 'none',
      fontSize: '12px',
      padding: '0',
    },
    container: {
      extend: {
        fontSize: '12px',
        lineHeight: '12px',
      },
    },
  },
  text: {
    extend: () => ({
      fontSize: '12px',
      color: '#999999',
      lineHeight: '12px',
    }),
  },
};

const CampaignMessageStep = () => {
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
        <Box width="70%">
          <Box margin="xsmall">
            <Grommet
              theme={textAreaTheme}
            >
              <TextAreaAutoresize
                resize={false}
                placeholder="Type yout message here..."
              />
            </Grommet>
          </Box>
          <Box>
            <Grommet
              theme={fileBlockTheme}
            >
              <Box pad={{ top: 'calc(100% - 48px)' }}>
                <Text>Select an image...</Text>
              </Box>
            </Grommet>
            <Grommet
              theme={fileBlockTitleTheme}
            >
              <Box pad="small" justify="center">
                <TextInput placeholder="Type your call to action here..." />
                <Text>resms.io/am1a</Text>
              </Box>
            </Grommet>
          </Box>
        </Box>
      </Step>
    </div>
  );
};

export default CampaignMessageStep;
