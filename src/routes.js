const routes = require('next-routes');

module.exports = routes()
  .add('campaign', '/:id', '[id]')
  .add('newCampaign', '/campaigns/new', 'campaigns/new')
  .add('campaignMessage', '/campaigns/:id/message', 'campaigns/[id]/message')
  .add('campaignConversation', '/campaigns/:id/conversation', 'campaigns/[id]/conversation')
  .add('campaignCustomization', '/campaigns/:id/customization', 'campaigns/[id]/customization')
  .add('campaignPreview', '/campaigns/:id/preview', 'campaigns/[id]/preview')
  .add('campaignPublished', '/campaigns/:id', 'campaigns/[id]/index');
