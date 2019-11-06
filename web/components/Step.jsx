import React from 'react';
import PropTypes from 'prop-types';
import {
  Stack, Box, Heading, Button, Text,
} from 'grommet';
import { Close, Edit } from 'grommet-icons';

function Step({
  children, submitDisabled, submitHref, backUrl, step, title, description,
}) {
  return (
    <Stack anchor="top-right">
      <Box background="light-2" height="100vh" pad="large" justify="between">
        <Box>
          <Text color="dark-4" size="small">
            STEP&nbsp;
            {step}
          </Text>
          <Heading>{title}</Heading>
          <Text color="dark-4">{description}</Text>
        </Box>
        <Box>{children}</Box>
        <Box direction="row" justify="between">
          {backUrl.showed ? (
            <Button
              plain
              href={backUrl.href}
              icon={<Edit size="small" />}
              label={backUrl.title}
              size="xsmall"
            />
          ) : (
            <span />
          )}
          <Button
            label="Continue"
            color="brand"
            primary
            disabled={submitDisabled}
            href={submitHref}
          />
        </Box>
      </Box>
      <Button margin="small" icon={<Close color="dark-4" size="medium" />} />
    </Stack>
  );
}

Step.propTypes = {
  children: PropTypes.node.isRequired,
  step: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  submitDisabled: PropTypes.bool,
  submitHref: PropTypes.string.isRequired,
  backUrl: PropTypes.shape({
    href: PropTypes.string,
    title: PropTypes.string,
    showed: PropTypes.bool.isRequired,
  }),
};

Step.defaultProps = {
  submitDisabled: false,
  backUrl: {
    showed: false,
  },
};

export default Step;
