import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Text, TextArea } from 'grommet';

import noop from 'lodash/noop';

function TextAreaAutoresize({
  value, onChange, style, ...rest
}) {
  const ref = React.createRef();
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (ref.current) {
      setSize({
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight,
      });
    }
  }, [value]);

  return (
    <>
      <Box
        forwardRef={ref}
        pad="medium"
        style={{
          visibility: 'hidden',
          position: 'absolute',
          maxWidth: '100%',
          ...style,
        }}
      >
        <Text
          weight="bold"
          dangerouslySetInnerHTML={{
            __html: `${
              value
                ? value
                  .replace(/\n$/, '<br />&nbsp;')
                  .replace(/\s$/, '&nbsp;')
                  .replace(/\n/g, '<br />')
                : rest.placeholder
            }`,
          }}
        />
      </Box>
      <TextArea {...rest} {...{ value, onChange }} style={{ ...size, ...style }} />
    </>
  );
}

TextAreaAutoresize.propTypes = {
  onChange: PropTypes.func,
};

TextAreaAutoresize.defaultProps = {
  onChange: noop,
};

export default TextAreaAutoresize;
