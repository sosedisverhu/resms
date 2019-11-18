import React from 'react';

import Head from 'next/head';
import { grommet, Grommet } from 'grommet';
import { deepMerge } from 'grommet/utils';
import isUndefined from 'lodash/isUndefined';

import RouteContext from '../contexts/RouteContext';
import CampaingContext from '../contexts/CampaingContext';
import useCampaign from '../hooks/useCampaign';
import Router from '../routes';

const theme = deepMerge(grommet, { global: { colors: { background: { light: '#F2F2F2' } } } });

function App({ Component, pageProps }) {
  const routeContext = typeof document === 'undefined' ? {} : Router.match(document.location.href);
  const { params: { id } = {} } = routeContext;
  const campaignContext = useCampaign(id);

  return (
    <RouteContext.Provider value={routeContext}>
      <CampaingContext.Provider value={campaignContext}>
        <Grommet theme={theme}>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
            <style>
              {`
            html, body { 
              margin: 0;
              padding: 0;
            }

            html, body {
              background: ${theme.global.colors.background.light};
            }
          `}
            </style>
          </Head>
          <Component {...pageProps} />
        </Grommet>
      </CampaingContext.Provider>
    </RouteContext.Provider>
  );
}

export default App;
