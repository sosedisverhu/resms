import React from 'react';
import PropTypes from 'prop-types';

import Link from 'next/link';

import {
  Stack, Box, Heading, Button, Text,
} from 'grommet';
import { Close, Edit } from 'grommet-icons';

function Step({
  children,
  submitDisabled,
  submitTitle,
  submitHref,
  submitShowed,
  submitAs,
  backUrlShowed,
  backUrlHref,
  backUrlAs,
  backUrlTitle,
  stepLabel,
  title,
  description,
}) {
  return (
    <Stack anchor="top-right">
      <Box background="light-2" height="100vh" pad="large" justify="between">
        <Box>
          <Text color="dark-4" size="small">
            {stepLabel}
          </Text>
          <Heading
            size="small"
            margin={{ top: 'none', bottom: 'medium' }}
          >
            {title}
          </Heading>
          <Text
            color="dark-4"
            size="xsmall"
          >
            {description}
          </Text>
        </Box>
        <Box>{children}</Box>
        <Box direction="row" justify="between" align="center">
          {backUrlShowed ? (
            <Link href={backUrlHref} as={backUrlAs}>
              <Button
                plain
                href={backUrlHref}
                icon={<Edit size="small" />}
                label={backUrlTitle}
                size="xsmall"
              />
            </Link>
          ) : (
            <span />
          )}
          {submitShowed ? (
            <Link href={submitHref} as={submitAs}>
              <Button
                label={submitTitle}
                color="brand"
                primary
                disabled={submitDisabled}
                href={!submitDisabled ? submitHref : undefined}
              />
            </Link>
          ) : (
            <span />
          )}
        </Box>
      </Box>
      <Button margin="small" icon={<Close color="dark-4" size="medium" />} />
    </Stack>
  );
}
Step.propTypes = {
  children: PropTypes.node.isRequired,
  stepLabel: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  submitDisabled: PropTypes.bool,
  submitShowed: PropTypes.bool,
  submitTitle: PropTypes.string,
  submitHref: PropTypes.string,
  submitAs: PropTypes.string,
  backUrlShowed: PropTypes.bool,
  backUrlHref: PropTypes.string,
  backUrlAs: PropTypes.string,
  backUrlTitle: PropTypes.string,
};

Step.defaultProps = {
  submitDisabled: false,
  submitShowed: true,
  submitTitle: 'Continue',
  backUrlTitle: 'Back',
  backUrlHref: '/',
  backUrlAs: '/',
  submitHref: '/',
  submitAs: '/',
  backUrlShowed: true,
};

export default Step;
