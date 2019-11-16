import React from 'react';

import Head from 'next/head';
import { grommet, Grommet } from 'grommet';
import { deepMerge } from 'grommet/utils';

import CampaingContext from '../contexts/CampaingContext';
import useRouteParams from '../hooks/useRouteParams';
import useCampaign from '../hooks/useCampaign';

const theme = deepMerge(grommet, {});

function App({ Component, pageProps }) {
  const { id } = useRouteParams();
  const campaignContext = useCampaign(id);

  return (
    <CampaingContext.Provider value={campaignContext}>
      <Grommet theme={theme}>
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
    </CampaingContext.Provider>
  );
}

export default App;
