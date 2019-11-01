import React, { useState, useEffect, useCallback } from 'react';

import { useRouter } from 'next/router';

import findIndex from 'lodash/findIndex';
import reduce from 'lodash/reduce';
import find from 'lodash/find';

import {
  Box, Text, TextInput, Button,
} from 'grommet';

import noop from 'lodash/noop';

import Step from '../../../components/Step';
import TextAreaAutoresize from '../../../components/TextAreaAutoresize';

import { firestore, storage } from '../../../helpers/firebase';

const initialFields = {
  message: { value: '', active: true },
  image: { value: '', active: false },
  title: { value: '', active: false },
};
const fieldsOrder = ['message', 'image', 'title'];

const CampaignMessageStep = () => {
  const router = useRouter();
  const [fields, setFields] = useState(initialFields);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [campaignNotFound, setCampaignStatus] = useState(false);

  const onFieldDoneHandler = useCallback(() => {
    const activeFieldName = find(fieldsOrder, (fieldName) => !fields[fieldName].value);
    const newFields = reduce(fields, (result, field, fieldName) => (
      { ...result, [fieldName]: { ...field, active: false } }
    ), {});

    if (!activeFieldName) {
      setSubmitDisabled(false);
      setFields(newFields);
      return;
    }

    newFields[activeFieldName].active = true;
    setSubmitDisabled(true);
    setFields(newFields);
  }, [fields.message.value, fields.image.value, fields.title.value]);
  const onChangeHandler = useCallback((fieldName) => (event) => {
    const newFields = { ...fields };

    newFields[fieldName].value = event.target.value;

    setFields(newFields);
  }, [fields.message.value, fields.image.value, fields.title.value]);
  const onImageChangeHandler = useCallback(() => {
    const newFields = { ...fields };

    newFields.image.value = 'file';

    setFields(newFields);
    // const file = event.target.files[0];
    // const ref = storage.ref().child(file.name);
    // event.target.value = '';

    onFieldDoneHandler();
  }, [fields.message.value, fields.image.value, fields.title.value]);
  const onSubmitHandler = useCallback(() => {
    const { id } = router.query;

    firestore
      .collection('campaigns')
      .doc(id)
      .update({
        message: fields.message.value,
        image: fields.image.value,
        title: fields.title.value,
      });

    router.push(`/campaigns/${id}/conversation`);
  }, [fields.message.value, fields.image.value, fields.title.value]);

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

          setFields({
            message: { value: data.message, active: false },
            image: { value: data.image, active: false },
            title: { value: data.title, active: false },
          });
          setSubmitDisabled(false);
        });
    }
    return noop;
  }, [router.query.id]);

  return (
    <Step
      backUrl={{ showed: false }}
      submitDisabled={submitDisabled}
      onSubmit={onSubmitHandler}
      header={{
        step: 1,
        title: 'Compose message',
        description: 'The message you specify will be send to recipent\'s phone number as SMS.',
      }}
    >
      <Box gap="small" width="70vw">
        <Box round="large" background={fields.message.active ? 'brand' : 'white'}>
          <TextAreaAutoresize
            size="small"
            plain
            resize={false}
            placeholder="Type yout message here..."
            onChange={onChangeHandler('message')}
            onBlur={onFieldDoneHandler}
            value={fields.message.value}
          />
        </Box>
        <Box round="large" overflow="hidden">
          <Button>
            <label htmlFor="image">
              <Box
                height="50vw"
                align="center"
                justify="center"
                background={fields.image.active ? 'brand' : 'light-1'}
              >
                <input
                  onChange={onImageChangeHandler}
                  id="image"
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                />
                <Text color="dark-4" size="small">
                  Select an image...
                </Text>
              </Box>
            </label>
          </Button>
          <Box background={fields.title.active ? 'brand' : 'white'}>
            <TextInput
              plain
              size="xsmall"
              placeholder="Type your call to action here..."
              onChange={onChangeHandler('title')}
              onBlur={onFieldDoneHandler}
              value={fields.title.value}
            />
            <Box pad={{ horizontal: 'medium', bottom: 'medium' }}>
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
