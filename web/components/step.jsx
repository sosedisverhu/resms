import React from 'react';
import PropTypes from 'prop-types';
import {
  Grommet,
  Box,
  Heading,
  Button,
  Text,
} from 'grommet';
import { Close } from 'grommet-icons';

const stepTheme = {
  global: {
    font: {
      family: 'Helvetica',
    },
  },
};

const closeButtonTheme = {
  button: {
    extend: () => ({
      color: '#ffffff',
      backgroundColor: '#f8f8f8',
      borderRadius: '100%',
      padding: '8px',
      width: '30px',
      height: '30px',
    }),
  },
};

const submitButtonTheme = {
  button: {
    color: '#9060eb',
    border: {
      width: '0',
    },
    extend: () => ({
      color: '#ffffff',
      backgroundColor: '#9060eb',
      width: '110px',
    }),
  },
};

const Step = ({ children, submitDisabled, backUrl }) => (
  <Grommet
    theme={stepTheme}
  >
    <Box
      background="#f2f2f2"
      height="100vh"
      pad="large"
      justify="between"
    >
      <Box>
        <Box
          direction="row"
          justify="between"
        >
          <Text
            a11yTitle="STEP 1"
            color="#999999"
          >
            STEP 1
          </Text>
          <Grommet
            theme={closeButtonTheme}
          >
            <Button
              icon={<Close color="#865cd6" size="15px" />}
            />
          </Grommet>
        </Box>
        <Heading
          a11yTitle="Compose message"
          level={1}
        >
          Compose message
        </Heading>
        <Text
          a11yTitle="The message you specify will send to recipent`s phone number as SMS."
          color="#9a9a9a"
        >
          The message you specify will send to recipent`s phone number as SMS.
        </Text>
      </Box>
      <Box>
        <Box>
          {children}
        </Box>
        <Box
          direction="row"
          align="center"
        >
          <Box
            width="50%"
          >
            { backUrl.showed && <Button href={backUrl.href}>{backUrl.title}</Button> }
          </Box>
          <Box
            width="50%"
            align="end"
          >
            <Grommet
              theme={submitButtonTheme}
            >
              <Button
                label="Continue"
                color="#9060eb"
                disabled={submitDisabled}
                onClick={() => {}}
              />
            </Grommet>
          </Box>
        </Box>
      </Box>
    </Box>
  </Grommet>
);

Step.propTypes = {
  children: PropTypes.node.isRequired,
  submitDisabled: PropTypes.bool.isRequired,
  backUrl: PropTypes.shape({
    href: PropTypes.string,
    title: PropTypes.string,
    showed: PropTypes.bool.isRequired,
  }).isRequired,
};

export default Step;
