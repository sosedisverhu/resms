import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import {
  Box, Text,
} from 'grommet';

function BlockPreviewCard({
  icon,
  type,
  label,
  onBlockAdd,
}) {
  const onBlockAddHandler = useCallback(() => onBlockAdd(type), [onBlockAdd, type]);
  const Icon = icon;

  return (
    <Box
      key={type}
      background="light-1"
      justify="center"
      align="center"
      round="medium"
      pad="medium"
      gap="medium"
      onClick={onBlockAddHandler}
    >
      <Icon size="medium" color="brand" />
      <Text color="brand" size="small">{label}</Text>
    </Box>
  );
}

BlockPreviewCard.propTypes = {
  type: PropTypes.string.isRequired,
  icon: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  onBlockAdd: PropTypes.func.isRequired,
};

export default BlockPreviewCard;
