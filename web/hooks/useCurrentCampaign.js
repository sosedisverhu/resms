import { useContext } from 'react';
import CampaingContext from '../contexts/CampaingContext';

function useCurrentCampaign() {
  return useContext(CampaingContext);
}

export default useCurrentCampaign;
