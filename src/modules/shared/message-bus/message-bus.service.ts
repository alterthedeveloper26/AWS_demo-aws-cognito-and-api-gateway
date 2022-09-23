import { SNS } from 'aws-sdk';
import { MessageAttributeMap } from 'aws-sdk/clients/sns';
import * as Https from 'https';

import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { RequestContext } from '~common/middlewares/request.context';
import { LoggerService } from '~shared/logger/logger.service';
import { getSnsTopics, SNSTopics } from '~shared/message-bus/snsTopics';
import { SNSTopicAliases } from '~shared/message-bus/types';

@Injectable()
export class MessageBusService {
  private snsClient: SNS;

  private topics: SNSTopics;

  constructor(
    protected readonly loggerService: LoggerService,
    protected readonly configService: ConfigService
  ) {
    this.snsClient = new SNS({
      region: configService.get('aws.defaultRegion'),
      httpOptions: {
        agent: new Https.Agent({
          keepAlive: true
        }),
        timeout: configService.get<number>('aws.sns.timeout')
      }
    });
    this.topics = getSnsTopics(configService.get('environment'));
  }

  async publish<T extends object>(
    message: T,
    topicAlias: SNSTopicAliases,
    messageAttributes: MessageAttributeMap = {}
  ): Promise<string | undefined> {
    const topicArn = this.topics[topicAlias];
    if (!topicArn) {
      throw Error(`TopicARN does not exist for alias: ${topicAlias}`);
    }

    try {
      this.loggerService.info(`Publish message: ${topicArn}`);

      const response = await this.snsClient
        .publish({
          Message: JSON.stringify(message),
          MessageAttributes: {
            ...messageAttributes,
            'cor-id': {
              DataType: 'String',
              StringValue: RequestContext.getCorrelationId()
            }
          },
          TopicArn: topicArn
        })
        .promise();

      return response?.MessageId || '';
    } catch (err) {
      this.loggerService.error('General error while publishing message', err, {
        topicArn,
        ...message
      });
      return undefined;
    }
  }
}
