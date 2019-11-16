import React, { Fragment } from 'react';
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
  submitButtonPrimary,
  submitAs,
  backUrlShowed,
  backUrlHref,
  backUrlAs,
  backUrlTitle,
  stepLabel,
  title,
  description,
}) {
  const SubmitButtonWrapper = submitDisabled ? Fragment : Link;

  return (
    <Stack anchor="top-right">
      <Box background="light-2" height="100vh" pad="large" justify="between">
        <Text color="dark-4" size="small">
          {stepLabel}
        </Text>
        <Heading
          size="small"
          margin={{ top: 'small', bottom: 'small' }}
        >
          {title}
        </Heading>
        <Text
          color="dark-4"
          size="xsmall"
          margin={{ bottom: 'small' }}
        >
          {description}
        </Text>
        <Box overflow="hidden">
          <Box overflow="auto" pad="xxsmall">{children}</Box>
        </Box>
        <Box direction="row" justify="between" align="center" pad={{ top: 'large' }}>
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
            <SubmitButtonWrapper {...submitDisabled ? {} : { href: submitHref, as: submitAs }}>
              <Box background={submitDisabled ? 'light-4' : 'brand'} pad={{ vertical: 'small', horizontal: 'xlarge' }} round="large">
                <Button
                  label={<Text weight="bold" color="white">{submitTitle}</Text>}
                  color={submitDisabled ? 'light-4' : 'brand'}
                  plain
                  primary={submitButtonPrimary}
                />
              </Box>
            </SubmitButtonWrapper>
          ) : (
            <span />
          )}
        </Box>
      </Box>
      <Button margin="small" icon={<Close color="dark-4" size="small" />} />
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
  submitButtonPrimary: PropTypes.bool,
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
  submitButtonPrimary: true,
  submitTitle: 'Continue',
  backUrlTitle: 'Back',
  backUrlHref: '/',
  backUrlAs: '/',
  submitHref: '/',
  submitAs: '/',
  backUrlShowed: true,
};

export default Step;
