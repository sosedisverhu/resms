import { firestore } from './index';

export default (campaignId, payload) => firestore
  .collection('campaigns')
  .doc(campaignId)
  .update(payload);
