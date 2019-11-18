import { useContext } from 'react';
import RouteContext from '../contexts/RouteContext';

function useRouteParams() {
  const { params } = useContext(RouteContext) || {};

  return params || {};
}

export default useRouteParams;
