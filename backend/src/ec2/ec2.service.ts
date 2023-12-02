import {
  DescribeInstancesCommand,
  EC2Client,
  RebootInstancesCommand,
  RunInstancesCommand,
  RunInstancesCommandInput,
  StartInstancesCommand,
  StopInstancesCommand,
  TerminateInstancesCommand,
} from '@aws-sdk/client-ec2';
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
      return new Ec2InstanceDetailInfo(instance, imageName);
    } catch (error) {
      console.error('Error get instance lists:', error);
      throw new InternalServerErrorException('Unable to get instance lists');
    }
  };

  startInstance = async (id: string) => {
    try {
      const command = new StartInstancesCommand({
        InstanceIds: [id],
      });
      const response = await this.ec2Client.send(command);
      if (
        response.StartingInstances[0].CurrentState.Name !==
        response.StartingInstances[0].PreviousState.Name
      ) {
        return { result: 'success' };
      } else {
        return { result: 'failed' };
      }
    } catch (error) {
      console.error(`Error start instance ${id}`, error);
      return { result: 'failed' };
    }
  };

  rebootInstance = async (id: string) => {
    try {
      const command = new RebootInstancesCommand({
        InstanceIds: [id],
      });
      const response = await this.ec2Client.send(command);
      if (response.$metadata.httpStatusCode === 200) {
        return { result: 'success' };
      } else {
        return { result: 'failed' };
      }
    } catch (error) {
      console.error(`Error reboot instance ${id}`, error);
      return { result: 'failed' };
    }
  };

  stopInstance = async (id: string) => {
    try {
      const command = new StopInstancesCommand({
        InstanceIds: [id],
      });
      const response = await this.ec2Client.send(command);
      if (
        response.StoppingInstances[0].CurrentState.Name !==
        response.StoppingInstances[0].PreviousState.Name
      ) {
        return { result: 'success' };
      } else {
        return { result: 'failed' };
      }
    } catch (error) {
      console.error(`Error stop instance ${id}`, error);
      return { result: 'failed' };
    }
  };

  deleteInstance = async (id: string) => {
    try {
      const command = new TerminateInstancesCommand({
        InstanceIds: [id],
      });
      const response = await this.ec2Client.send(command);
      if (
        response.TerminatingInstances[0].CurrentState.Name !==
        response.TerminatingInstances[0].PreviousState.Name
      ) {
        return { result: 'success' };
      } else {
        return { result: 'failed' };
      }
    } catch (error) {
      console.error(`Error stop instance ${id}`, error);
      return { result: 'failed' };
    }
  };

  createInstance = async (instanceName: string, imageName: string) => {
    const imageList = this.cacheService.get('imageList');
    let imageId = '';
    for (const imageObj of imageList) {
      if (imageObj.name === imageName) {
        imageId = imageObj.id;
      }
    }
    if (imageId === '') {
      return { result: 'failed' };
    }

    const instanceParams: RunInstancesCommandInput = {
      ImageId: imageId,
      InstanceType: 't2.micro',
      KeyName: 'cctp_key',
      MaxCount: 1,
      MinCount: 1,
      SecurityGroupIds: ['sg-08aaaf7d00550f8e2'],
      TagSpecifications: [
        {
          ResourceType: 'instance',
          Tags: [
            {
              Key: 'Name',
              Value: instanceName,
            },
          ],
        },
      ],
    };
    try {
      const command = new RunInstancesCommand(instanceParams);
      const response = await this.ec2Client.send(command);
      console.log('Created Instance', response.Instances);
      if (response.$metadata.httpStatusCode === 200) {
        return { result: 'success' };
      } else {
        return { result: 'failed' };
      }
    } catch (error) {
      console.error('Error creating result', error);
      return { result: 'failed' };
    }
  };
}
