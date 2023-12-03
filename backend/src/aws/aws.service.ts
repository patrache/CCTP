import { EC2Client } from '@aws-sdk/client-ec2';
import { SSMClient } from '@aws-sdk/client-ssm';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AwsService {
  private ec2Client: EC2Client;
  private ssmClient: SSMClient;
  private region = 'ap-northeast-2';

  constructor(config: ConfigService) {
    const accessKeyId = config.get('AWS_ACCESS_KEY_ID');
    const secretAccessKey = config.get('AWS_SECRET_ACCESS_KEY');

    this.ec2Client = new EC2Client({
      region: this.region,
      credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
      },
    });

    this.ssmClient = new SSMClient({
      region: this.region,
      credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
      },
    });
  }

  getEC2Client() {
    return this.ec2Client;
  }

  getSSMClient() {
    return this.ssmClient;
  }

  getRegion() {
    return this.region;
  }
}
