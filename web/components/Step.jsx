import React from 'react';
import PropTypes from 'prop-types';
import {
  Stack, Box, Heading, Button, Text,
} from 'grommet';
import { Close, Edit } from 'grommet-icons';

import noop from 'lodash/noop';

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
          <Button href={backUrl.href}>
            <Edit size="small" />
            &nbsp;
            <Text size="small">{backUrl.title}</Text>
          </Button>
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
  header: PropTypes.shape({
    step: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  submitDisabled: PropTypes.bool,
  onSubmit: PropTypes.func,
  backUrl: PropTypes.shape({
    href: PropTypes.string,
    title: PropTypes.string,
    showed: PropTypes.bool.isRequired,
  }),
};

Step.defaultProps = {
  onSubmit: noop,
  submitDisabled: false,
  backUrl: {
    showed: false,
  },
};

export default Step;
