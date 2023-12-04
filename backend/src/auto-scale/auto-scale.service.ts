import {
  EC2Client,
  RunInstancesCommand,
  RunInstancesCommandInput,
  TerminateInstancesCommand,
} from '@aws-sdk/client-ec2';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { AwsService } from 'src/aws/aws.service';
import { CacheService } from 'src/cache/cache.service';

@Injectable()
export class AutoScaleService {
  private ec2Client: EC2Client = this.awsService.getEC2Client();
  constructor(
    @Inject(forwardRef(() => CacheService))
    private cacheService: CacheService,
    private awsService: AwsService,
  ) {}

  checkAutoScale = async () => {
    console.log('checkAutoScale started');
    const instanceNumber = this.cacheService.get('instanceNumber');
    const idleCount = this.cacheService.get('idleCount');
    const scaledInstance = this.cacheService.get('scaledInstance');

    if (instanceNumber === undefined || idleCount === undefined) {
      return;
    }

    const max = 32;
    console.log('scaledInstance.length: ' + scaledInstance.length);
    console.log('instanceNumber', instanceNumber);
    console.log('idleCount', idleCount);
    if (
      idleCount / 2 > instanceNumber + scaledInstance.length &&
      instanceNumber < max
    ) {
      const toScale = Math.min(
        Math.ceil(idleCount / 2 - instanceNumber - scaledInstance.length),
        max - instanceNumber - scaledInstance.length,
      );
      await this.ScaleUp(toScale);
    }

    if (idleCount / 2 < instanceNumber && scaledInstance.length >= 1) {
      const toScale = Math.min(
        Math.ceil(idleCount / 2 - instanceNumber),
        instanceNumber - 1,
      );
      await this.ScaleDown(Math.abs(toScale));
    }
  };

  private ScaleUp = async (toScale: number) => {
    console.log('scaleup started');
    const scaledInstance = this.cacheService.get('scaledInstance');
    console.log('toScale', toScale);
    if (toScale < 1) return;
    console.log('toScale', toScale);
    toScale = Math.ceil(toScale);
    const result = await this.createInstance(toScale);

    if (result && 'Instances' in result) {
      const instanceIds = result.Instances.map(
        (instance) => instance.InstanceId,
      );
      const tempScaledInstance = scaledInstance.concat(instanceIds);
      this.cacheService.set('scaledInstance', tempScaledInstance);
    }
  };

  private ScaleDown = async (toScale: number) => {
    const scaledInstance = this.cacheService.get('scaledInstance');
    const poppedInstances: string[] = [];
    console.log('toScale', toScale);
    if (toScale < 1) return;
    toScale = Math.ceil(toScale);

    for (let i = 0; i < toScale; i++) {
      const poppedInstance = scaledInstance.pop();
      if (poppedInstance) {
        poppedInstances.push(poppedInstance);
      }
    }
    this.deleteInstances(poppedInstances);
    this.cacheService.set('scaledInstance', scaledInstance);
  };

  private deleteInstances = async (id: string[]) => {
    try {
      const command = new TerminateInstancesCommand({
        InstanceIds: id,
      });
      return await this.ec2Client.send(command);
    } catch (error) {
      console.error(`Error stop instance ${id}`, error);
      return { result: 'failed' };
    }
  };

  private createInstance = async (autoScaleNumber: number) => {
    const imageList = this.cacheService.get('imageList');
    let imageId = '';
    for (const imageObj of imageList) {
      if (imageObj.name === 'htcondor-slave') {
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
      MaxCount: autoScaleNumber,
      MinCount: 1,
      SecurityGroupIds: ['sg-08aaaf7d00550f8e2'],
      TagSpecifications: [
        {
          ResourceType: 'instance',
          Tags: [
            {
              Key: 'Name',
              Value: 'autoScaledInstance',
            },
          ],
        },
      ],
    };
    try {
      const command = new RunInstancesCommand(instanceParams);
      const response = await this.ec2Client.send(command);
      console.log('Created Instance', response.Instances);
      return response;
    } catch (error) {
      console.error('Error creating result', error);
      return { result: 'failed' };
    }
  };
}
