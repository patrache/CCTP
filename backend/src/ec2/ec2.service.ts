import { DescribeInstancesCommand, EC2Client } from '@aws-sdk/client-ec2';
import { Injectable } from '@nestjs/common';
import { AwsService } from 'src/aws/aws.service';
import { SummarizedEc2InstanceModel } from './model';

@Injectable()
export class Ec2Service {
  private ec2Client: EC2Client = this.awsService.getEC2Client();
  constructor(private awsService: AwsService) {}

  getInstancesList = async () => {
    try {
      const command = new DescribeInstancesCommand({});
      const response = await this.ec2Client.send(command);
      return await response.Reservations.map((instance) => {
        const selectedInstance = instance.Instances[0];
        const instanceName = selectedInstance.Tags[0].Value;
        const imageName = selectedInstance.ImageId;
        const instanceType = selectedInstance.InstanceType;
        const state = selectedInstance.State.Name;
        const publicDNS = selectedInstance.PublicDnsName ?? '-';
        const publicIP = selectedInstance.PublicIpAddress ?? '-';
        const zone = selectedInstance.Placement.AvailabilityZone;

        return new SummarizedEc2InstanceModel(
          instanceName,
          imageName,
          instanceType,
          state,
          publicDNS,
          publicIP,
          zone,
        );
      });
    } catch (error) {
      console.error('Error', error);
    }
  };
}
