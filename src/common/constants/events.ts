import { MessageAttributeMap } from 'aws-sdk/clients/sns';

export enum Events {
  userCreated = 'userCreated',
  newSubscriptionApplied = 'newSubscriptionApplied',
  subscriptionActivated = 'subscriptionActivated',
  subscriptionExpiredSoon = 'subscriptionExpiredSoon',
  subscriptionSuspended = 'subscriptionSuspended',
  documentRejected = 'documentRejected'
}

export const subscriberMessageAttributes: Record<string, MessageAttributeMap> =
  {
    notificationService: {
      'sqs-name': {
        DataType: 'String',
        StringValue: 'notificationServiceQueue'
      }
    }
  };
