import { DescribeInstancesCommand, EC2Client } from '@aws-sdk/client-ec2';
import { Injectable } from '@nestjs/common';
import { AwsService } from 'src/aws/aws.service';

@Injectable()
export class Ec2Service {
  private ec2Client: EC2Client = this.awsService.getEC2Client();
  constructor(private awsService: AwsService) {}

  getInstancesList = async () => {
    try {
      const command = new DescribeInstancesCommand({});
      const response = await this.ec2Client.send(command);
      response.Reservations.forEach((reservation) => {
        reservation.Instances.forEach((instance) => {
          console.log(
            `Instance ID: ${instance.InstanceId}, State: ${JSON.stringify(
              instance,
              null,
              4,
            )}`,
          );
        });
      });
      return response.Reservations;
    } catch (error) {
      console.error('Error', error);
    }
  };
}
