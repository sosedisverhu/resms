import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import isUndefined from 'lodash/isUndefined';
import TextAreaAutoresize from './TextAreaAutoresize';
import useCurrentCampaignAttribute from '../hooks/useCurrentCampaignAttribute';

function BlockText({ blockIndex }) {
  const [text, setText] = useCurrentCampaignAttribute(
    isUndefined(blockIndex) ? 'message' : ['content', blockIndex, 'value'],
  );

  const onChange = useCallback((event) => setText(event.target.value), [setText]);

  return (
    <Box round="large" background="white" elevation="xsmall">
      <TextAreaAutoresize
        size="small"
        plain
        resize={false}
        placeholder="Type your message here..."
        value={text}
        {...{ onChange }}
      />
    </Box>
  );
}

BlockText.propTypes = {
  blockIndex: PropTypes.number,
};

export default BlockText;
