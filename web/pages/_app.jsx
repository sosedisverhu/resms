import React from 'react';
import PropTypes from 'prop-types';

import Head from 'next/head';
import { grommet, Grommet } from 'grommet';
import { deepMerge } from 'grommet/utils';

const theme = deepMerge(grommet, {});

function App({ Component, pageProps }) {
  return (
    <Grommet {...theme}>
      <Head>
        <style>
          {`
            html, body { 
              margin: 0;
              padding: 0;
            }

            html {
              background-color: ${theme.global.colors.background};
            }
          `}
        </style>
      </Head>
      <Component {...pageProps} />
    </Grommet>
  );
}

App.propTypes = {
  Component: PropTypes.node.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default App;
