import { PRODUCTION, STAGING, UAT } from '~common/constants/environments';

const { SNS_DOMAIN } = process.env;

export type SNSTopics = {
  userCreated: string;
  newSubscriptionApplied: string;
  subscriptionActivated: string;
  subscriptionExpiredSoon: string;
  subscriptionSuspended: string;
};

const getTopicArnByEnv = (env: string): SNSTopics => ({
  userCreated: `${SNS_DOMAIN}:UserCreatedTopic${env}`,
  newSubscriptionApplied: `${SNS_DOMAIN}:NewSubscriptionAppliedTopic${env}`,
  subscriptionActivated: `${SNS_DOMAIN}:SubscriptionActivatedTopic${env}`,
  subscriptionExpiredSoon: `${SNS_DOMAIN}:SubscriptionExpiredSoonTopic${env}`,
  subscriptionSuspended: `${SNS_DOMAIN}:SubscriptionSuspendedTopic${env}`
});

export const getSnsTopics = (env: string): SNSTopics => {
  switch (env) {
    case STAGING:
      return getTopicArnByEnv('Staging');
    case UAT:
      return getTopicArnByEnv('Uat');
    case PRODUCTION:
      return getTopicArnByEnv('Prod');
    default:
      return getTopicArnByEnv('Staging');
  }
};
