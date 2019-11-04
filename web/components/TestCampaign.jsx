import React, { useState, useCallback } from 'react';

import { Send } from 'grommet-icons';

import {
  Box, Text, Select, Form, Button, TextInput,
} from 'grommet';

const options = ['+371', '+372', '+373', '+374', '+375'];

const TestCampaign = () => {
  const [activeMobilePrefix, setActiveMobilePrefix] = useState(options[0]);

  const onSelectChange = useCallback(({ option }) => setActiveMobilePrefix(option), []);

  return (
    <Box>
      <Text color="dark-1" size="small">Send yourself a test message</Text>
      <Text color="dark-4" size="xsmall">
        Fill your phone number in and hit send.
        We will deliver a test SMS to your phone for preview.
      </Text>
      <Form>
        <Box direction="row">
          <Box gap="small" direction="row">
            <Box background="white" width="120px">
              <Select
                options={options}
                value={activeMobilePrefix}
                onChange={onSelectChange}
                focusIndicator={false}
              />
            </Box>
            <Box background="white">
              <TextInput focusIndicator={false} />
            </Box>
          </Box>
          <Button focusIndicator={false} pad="none" icon={<Send color="brand" size="medium" />} />
        </Box>
      </Form>
    </Box>
  );
};

export default TestCampaign;
