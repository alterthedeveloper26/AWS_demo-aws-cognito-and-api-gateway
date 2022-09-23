import { Events } from '~common/constants/events';

export enum SNSTopicAliases {
  UserCreated = 'userCreated',
  NewSubscriptionApplied = 'newSubscriptionApplied',
  SubscriptionActivated = 'subscriptionActivated',
  SubscriptionExpiredSoon = 'subscriptionExpiredSoon',
  SubscriptionSuspended = 'subscriptionSuspended'
}

// Notification service message
export type NotificationType = 'email' | 'push-noti' | 'sms' | 'otp';

export interface NotificationMessage {
  eventName: Events;
  types: [NotificationType];
  sender: string;
  receiver: string;
  sentAt: number;
  correlationId: string;
  data: Record<string, unknown>;
}
