import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextArea } from 'grommet';

import noop from 'lodash/noop';

function TextAreaAutoresize({ value, ...rest }) {
  const ref = React.createRef();

  useEffect(() => {
    const txt = ref.current;

    if (txt) {
      txt.rows = 1;

      do {
        if (txt.clientHeight !== txt.scrollHeight) {
          txt.rows += 1;
        }
      } while (txt.clientHeight < txt.scrollHeight);
    }
  }, [ref, value]);

  return <TextArea {...rest} forwardRef={ref} {...{ value }} />;
}

TextAreaAutoresize.propTypes = {
  onChange: PropTypes.func,
};

TextAreaAutoresize.defaultProps = {
  onChange: noop,
};

export default TextAreaAutoresize;
