import React from 'react';
import { Text } from 'grommet';

import useRouteParams from '../hooks/useRouteParams';

function CampaignLink({ plain, ...textProps }) {
  const { id } = useRouteParams();
  const children = `resms.io/${id}`;

  if (plain) return children;

  return <Text {...textProps}>{children}</Text>;
}

export default CampaignLink;
