import React from 'react';

import Head from 'next/head';
import { grommet, Grommet } from 'grommet';
import { deepMerge } from 'grommet/utils';

import CampaingContext from '../contexts/CampaingContext';
import useRouteParams from '../hooks/useRouteParams';
import useCampaign from '../hooks/useCampaign';

const theme = deepMerge(grommet, { global: { colors: { background: { light: '#F2F2F2' } } } });

function App({ Component, pageProps }) {
  const { id } = useRouteParams();
  const campaignContext = useCampaign(id);

  return (
    <CampaingContext.Provider value={campaignContext}>
      <Grommet theme={theme}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
  );
}

export default App;
