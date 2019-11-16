import { useMemo } from 'react';
import Router from '../routes';

function useRouteParams() {
  const url = typeof window === 'undefined' ? '' : window.location.href;
  const { params = {} } = useMemo(() => Router.match(url), [url]);
  return params;
}

export default useRouteParams;
