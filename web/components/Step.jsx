import React from "react";
import PropTypes from "prop-types";
import { Stack, Box, Heading, Button, Text } from "grommet";
import { Close } from "grommet-icons";

const Step = ({ children, submitDisabled, backUrl }) => (
  <Stack anchor="top-right">
    <Box background="light-2" height="100vh" pad="large" justify="between">
      <Box>
        <Text color="dark-4" size="small">
          STEP 1
        </Text>
        <Heading>Compose message</Heading>
        <Text color="dark-4">
          The message you specify will be send to recipent's phone number as
          SMS.
        </Text>
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
          onClick={() => {}}
        />
      </Box>
    </Box>
    <Button margin="small" icon={<Close color="dark-4" size="medium" />} />
  </Stack>
);

Step.propTypes = {
  children: PropTypes.node.isRequired,
  submitDisabled: PropTypes.bool.isRequired,
  backUrl: PropTypes.shape({
    href: PropTypes.string,
    title: PropTypes.string,
    showed: PropTypes.bool.isRequired
  }).isRequired
};

export default Step;
