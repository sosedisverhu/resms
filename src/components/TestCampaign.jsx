import React, { useState, useCallback } from 'react';
import filter from 'lodash/filter';
import startsWith from 'lodash/startsWith';
import { Send } from 'grommet-icons';

import {
  Box, Text, Select, Form, Button, TextInput,
} from 'grommet';

import countries from '../constants/countries';

function TestCampaign() {
  const [options, setOptions] = useState(countries);
  const [activeMobilePrefix, setActiveMobilePrefix] = useState('+371');

  const onSearch = useCallback((query) => {
    setOptions(
      query
        ? filter(
          countries,
          (country) => startsWith(country.name, query)
              || startsWith(country.dialCode, query)
              || startsWith(country.dialCode, `+${query}`),
        )
        : countries,
    );
  }, []);

  const onOpen = useCallback(() => {
    setOptions(countries);
  }, []);

  const onSelectChange = useCallback(({ option }) => setActiveMobilePrefix(option.dialCode), []);

  return (
    <Box>
      <Text color="dark-1" size="small">
        Send yourself a test message
      </Text>
      <Text color="dark-4" size="xsmall" margin={{ bottom: 'small' }}>
        Fill your phone number in and hit send. We will deliver a test SMS to your phone for
        preview.
      </Text>
      <Form>
        <Box direction="row">
          <Box gap="small" direction="row" align="start">
            <Select
              round="large"
              options={options}
              labelKey={(country) => `${country.name} (${country.dialCode})`}
              valueKey="dialCode"
              value={activeMobilePrefix}
              onChange={onSelectChange}
              {...{ onSearch, onOpen }}
            />
            <TextInput round="large" focusIndicator={false} />
          </Box>
          <Button pad="none" icon={<Send color="brand" size="medium" />} />
        </Box>
      </Form>
    </Box>
  );
}

export default TestCampaign;
