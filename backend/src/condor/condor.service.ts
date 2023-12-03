import { DescribeInstancesCommand, EC2Client } from '@aws-sdk/client-ec2';
import { SSMClient } from '@aws-sdk/client-ssm';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AwsService } from 'src/aws/aws.service';

@Injectable()
export class CondorService {
  private ec2Client: EC2Client = this.awsService.getEC2Client();
  private ssmClient: SSMClient = this.awsService.getSSMClient();
  constructor(private awsService: AwsService) {}

  getMasterList = async () => {
    try {
      const command = new DescribeInstancesCommand({});
      const response = await this.ec2Client.send(command);
      const ipList = response.Reservations.map((instance) => {
        const selectedInstance = instance.Instances[0];
        if (
          selectedInstance.ImageId === 'ami-09e70258ddbdf3c90' ||
          selectedInstance.ImageId === 'ami-0c75e05f56ff78229'
        ) {
          return { ip: selectedInstance.PrivateIpAddress };
        }
        return null;
      });
      console.log('get master list called');
      const masterList = ipList.filter((item) => item !== null);
      return masterList;
    } catch (error) {
      console.error('Error get master lists:', error);
      throw new InternalServerErrorException('Unable to get instance lists');
    }
  };
}
