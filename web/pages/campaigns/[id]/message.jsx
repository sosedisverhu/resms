import React, { useState, useEffect } from "react";

import { useRouter } from "next/router";

import { Box, Text, TextInput, Button } from "grommet";
import Step from "../../../components/Step";
import TextAreaAutoresize from "../../../components/TextAreaAutoresize";
import firestore from "../../../helpers/firestore";

const CampaignMessageStep = () => {
  const router = useRouter();
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [campaign, setCampaign] = useState(null);
  const [campaignNotFound, setCampaignStatus] = useState(false);

  useEffect(() => {
    if (router.query.id) {
      return firestore
        .collection("campaigns")
        .doc(router.query.id)
        .onSnapshot(doc => {
          const data = doc.data();

          if (!data) {
            return setCampaignStatus(true);
          }

          return setCampaign(data);
        });
    }
  }, [router.query.id]);

  return (
    <Step backUrl={{ showed: false }} submitDisabled={submitDisabled}>
      <Box gap="small" width="70vw">
        <Box round="large" background="brand">
          <TextAreaAutoresize
            size="small"
            plain
            resize={false}
            placeholder="Type yout message here..."
          />
        </Box>
        <Box round="large" overflow="hidden">
          <Button>
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
          </Button>
          <Box background="white">
            <TextInput
              plain
              size="xsmall"
              placeholder="Type your call to action here..."
            />
            <Box pad={{ horizontal: "medium", bottom: "medium" }}>
              <Text color="dark-4" size="xsmall">
                resms.io/am1a
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Step>
  );
};

export default CampaignMessageStep;
