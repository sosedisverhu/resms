import { Router } from '../routes';

export default function buildSteps(id) {
  return [
    {
      title: 'Compose message',
      description: "The message you specify will be send to recipent's phone number as SMS.",
      onSubmit: () => {
        Router.pushRoute('campaignConversation', { id });
      },
      canSubmit: (campaign) => campaign.message && campaign.title && campaign.image,
    },

    {
      title: 'Build conversation',
      description:
        "The conversation you're about to build is happening after recipient clicks a link in the original SMS.",
      onBack: () => {
        Router.pushRoute('campaignMessage', { id });
      },
      onSubmit: () => {
        Router.pushRoute('campaignCustomization', { id });
      },
      canSubmit: (campaign) => campaign.content.length > 0 && !campaign.content.some((block) => !block.value),
    },

    {
      title: 'Customize experience',
      description: 'Now lets customize user experience to match your needs.',
      onBack: () => {
        Router.pushRoute('campaignConversation', { id });
      },
      onSubmit: () => {
        Router.pushRoute('campaignPreview', { id });
      },
    },

    {
      title: 'Launch campaign',
      description:
        "You're now ready to go live. It is a good idea to send yourself a test message first.",
      onBack: () => {
        Router.pushRoute('campaignCustomization', { id });
      },
      onSubmit: () => {
        Router.pushRoute('campaign', { id });
      },
      submitLabel: 'Publish',
    },

    {
      title: 'You’ve done it!',
      description:
        'Your campaign is now live! There is a single step left — grab the generated message and send to your audience with a provider of your choice.',
      onBack: () => {
        Router.pushRoute('campaignMessage', { id });
      },
      backLabel: 'Edit',
      onSubmit: () => {
        window.close();
      },
      submitLabel: 'Use Campaign',
    },
  ];
}
