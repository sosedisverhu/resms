import React from 'react';
import PropTypes from 'prop-types';
import {
  Stack, Box, Heading, Button, Text,
} from 'grommet';
import { Close } from 'grommet-icons';

const Step = ({
  children, submitDisabled, backUrl, onSubmit, header,
}) => (
  <Stack anchor="top-right">
    <Box background="light-2" height="100vh" pad="large" justify="between">
      <Box>
        <Text color="dark-4" size="small">
          STEP&nbsp;
          {header.step}
        </Text>
        <Heading>{header.title}</Heading>
        <Text color="dark-4">{header.description}</Text>
      </Box>
      <Box>{children}</Box>
      <Box direction="row" justify="between">
        {backUrl.showed ? (
          <Button href={backUrl.href}>{backUrl.title}</Button>
        ) : (
          <span />
        )}
        <Button
          label="Continue"
          color="brand"
          primary
          disabled={submitDisabled}
          onClick={onSubmit}
        />
      </Box>
    </Box>
    <Button margin="small" icon={<Close color="dark-4" size="medium" />} />
  </Stack>
);

Step.propTypes = {
  children: PropTypes.node.isRequired,
  submitDisabled: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  backUrl: PropTypes.shape({
    href: PropTypes.string,
    title: PropTypes.string,
    showed: PropTypes.bool.isRequired,
  }).isRequired,
  header: PropTypes.shape({
    step: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default Step;
