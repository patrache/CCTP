import { DescribeInstancesCommand, EC2Client } from '@aws-sdk/client-ec2';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AwsService } from 'src/aws/aws.service';
import { Ec2InstanceDetailInfo, SummarizedEc2InstanceModel } from './model';
import { CacheService } from 'src/cache/cache.service';

@Injectable()
export class Ec2Service {
  private ec2Client: EC2Client = this.awsService.getEC2Client();
  constructor(
    private awsService: AwsService,
    private cacheService: CacheService,
  ) {}

  getInstancesList = async () => {
    const imageList = this.cacheService.get('imageList');
    try {
      const command = new DescribeInstancesCommand({});
      const response = await this.ec2Client.send(command);
      return response.Reservations.map((instance) => {
        const selectedInstance = instance.Instances[0];
        const instanceName = selectedInstance.Tags[0].Value;

        const image = imageList.find(
          (image) => image.id === selectedInstance.ImageId,
        );
        let imageName = image ? image.name : selectedInstance.ImageId;
        // TODO: 처음 만들어진 인스턴스를 없앨 때 지워줘야함.
        if (imageName === 'ami-09e70258ddbdf3c90')
          imageName = 'htcondor-master';

        const instanceType = selectedInstance.InstanceType;
        const state = selectedInstance.State.Name;
        const publicDNS = selectedInstance.PublicDnsName ?? '-';
        const publicIP = selectedInstance.PublicIpAddress ?? '-';
        const zone = selectedInstance.Placement.AvailabilityZone;
        const instanceId = selectedInstance.InstanceId;

        return new SummarizedEc2InstanceModel(
          instanceName,
          imageName,
          instanceType,
          state,
          publicDNS,
          publicIP,
          zone,
          instanceId,
        );
      });
    } catch (error) {
      console.error('Error get instance lists:', error);
      throw new InternalServerErrorException('Unable to get instance lists');
    }
  };

  getInstanceDetailInfo = async (id: string) => {
    const imageList = this.cacheService.get('imageList');
    try {
      const command = new DescribeInstancesCommand({ InstanceIds: [id] });
      const response = await this.ec2Client.send(command);
      const instance = response.Reservations[0].Instances[0];
      const image = imageList.find((image) => image.id === instance.ImageId);
      let imageName = image ? image.name : instance.ImageId;
      if (imageName === 'ami-09e70258ddbdf3c90') imageName = 'htcondor-master';
      return new Ec2InstanceDetailInfo(instance, image);
    } catch (error) {
      console.error('Error get instance lists:', error);
      throw new InternalServerErrorException('Unable to get instance lists');
    }
  };
}
