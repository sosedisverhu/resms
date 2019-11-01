import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import noop from 'lodash/noop';
import findIndex from 'lodash/findIndex';
import uniqid from 'uniqid';

import {
  Box, Button,
} from 'grommet';
import { Add } from 'grommet-icons';
import blocksMap from './blocks/blocksMap';

const DEFAULT_BLOCK = {
  type: 'text',
  id: {},
  value: '',
};

const CampaignMessageStep = ({ content, onChange }) => {
  const onBlockAddHandler = useCallback(() => {
    const newContent = [...content];

    newContent.push({
      ...DEFAULT_BLOCK,
      id: uniqid(),
    });

    onChange(newContent);
  }, [content]);
  const onBlockChangeHandler = useCallback((blockId) => (value) => {
    const newContent = [...content];
    const changedBlockIndex = findIndex(newContent, (({ id }) => id === blockId));

    newContent[changedBlockIndex].value = value;

    onChange(newContent);
  }, [content.map((block) => block.id)]);

  return (
    <Box gap="medium">
      {content.map((block) => {
        const Component = blocksMap[block.type];

        if (!Component) {
          return null;
        }

        return (
          <Component
            onChange={onBlockChangeHandler(block.id)}
            value={block.value}
            key={block.id}
          />
        );
      })}
      <Box round="large" width="180px">
        <Button
          icon={<Add />}
          label="Add block"
          primary={!!content.length}
          onClick={onBlockAddHandler}
        />
      </Box>
    </Box>
  );
};

CampaignMessageStep.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ),
  onChange: PropTypes.func,
};

CampaignMessageStep.defaultProps = {
  content: [],
  onChange: noop,
};

export default CampaignMessageStep;
