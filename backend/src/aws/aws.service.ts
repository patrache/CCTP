import { EC2Client } from '@aws-sdk/client-ec2';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AwsService {
  private ec2Client: EC2Client;

  constructor(config: ConfigService) {
    const accessKeyId = config.get('AWS_ACCESS_KEY_ID');
    const secretAccessKey = config.get('AWS_SECRET_ACCESS_KEY');

    this.ec2Client = new EC2Client({
      region: 'ap-northeast-2',
      credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
      },
    });
  }

  getEC2Client() {
    return this.ec2Client;
  }
}
