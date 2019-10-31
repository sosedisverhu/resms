import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  TextArea,
} from 'grommet';

import noop from 'lodash/noop';

const textarea = React.createRef();

const TextAreaAutoresize = ({ onChange, ...rest }) => {
  const [rows, setRows] = useState(1);
  const onChangeHandler = useCallback((event) => {
    const txt = textarea.current;

    if (txt) {
      txt.rows = 1;

      do {
        if (txt.clientHeight !== txt.scrollHeight) {
          txt.rows += 1;
        }
      } while (txt.clientHeight < txt.scrollHeight);

      setRows(txt.rows);
    }

    onChange(event.target.value);
  }, []);

  return (
    <TextArea
      {...rest}
      forwardRef={textarea}
      rows={rows}
      onChange={onChangeHandler}
    />
  );
};

TextAreaAutoresize.propTypes = {
  onChange: PropTypes.func,
};

TextAreaAutoresize.defaultProps = {
  onChange: noop,
};

export default TextAreaAutoresize;
