import React, { useState, useCallback, useEffect } from 'react';

import {
  Box, Text,
} from 'grommet';

import find from 'lodash/find';
import remove from 'lodash/remove';

import isNull from 'lodash/isNull';
import useCampaign from '../../../hooks/useCampaign';
import Step from '../../../components/Step';
import CampaignMessage from '../../../components/CampaignMessage';
import CampaignOpenGraph from '../../../components/CampaignOpenGraph';

const fieldsOrder = ['message', 'image', 'title'];
const getActiveFieldName = (fieldsNames, values) => find(
  fieldsNames, (fieldName) => !values[fieldName],
);

function CampaignMessageStep() {
  const { campaign, campaignId } = useCampaign();
  const [activeFieldName, setActiveFieldName] = useState(fieldsOrder[0]);

  const onFocus = useCallback((fieldName) => {
    const fieldNames = remove([...fieldsOrder], (field) => field !== fieldName);
    setActiveFieldName(getActiveFieldName(fieldNames, campaign));
  }, [campaign]);
  const onBlur = useCallback((fieldName, value) => {
    setActiveFieldName(
      getActiveFieldName(fieldsOrder, {
        ...campaign,
        [fieldName]: value,
      }),
    );
  }, [campaign]);

  useEffect(() => {
    if (campaign) {
      setActiveFieldName(getActiveFieldName(fieldsOrder, campaign));
    }
  }, [campaign]);

  if (isNull(campaign)) {
    return <Text>Loading</Text>;
  }

  if (!campaign) {
    return <Text>Campaign not found</Text>;
  }

  const activity = {
    message: false,
    image: false,
    title: false,
  };
  activity[activeFieldName] = true;

  return (
    <Step
      backUrlShowed={false}
      submitDisabled={!(campaign.message && campaign.title && campaign.image)}
      submitHref="/campaigns/[id]/conversation"
      submitAs={`/campaigns/${campaignId}/conversation`}
      stepLabel="STEP 1"
      title="Compose message"
      description="The message you specify will be send to recipent's phone number as SMS."
    >
      <Box gap="small" width="70vw">
        <CampaignMessage
          onFocus={onFocus}
          onBlur={onBlur}
          isActive={activity.message}
        />
        <CampaignOpenGraph
          onFocus={onFocus}
          onBlur={onBlur}
          activity={activity}
        />
      </Box>
    </Step>
  );
}

export default CampaignMessageStep;
