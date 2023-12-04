import { DescribeInstancesCommand, EC2Client } from '@aws-sdk/client-ec2';
import {
  GetCommandInvocationCommand,
  SSMClient,
  SendCommandCommand,
} from '@aws-sdk/client-ssm';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AwsService } from 'src/aws/aws.service';
import { NodeStatus, TotalStatus } from './model';
import { QueueModel } from './model/queue.model';

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
      const masterList = ipList.filter((item) => item !== null);
      return masterList;
    } catch (error) {
      console.error('Error get master lists:', error);
      throw new InternalServerErrorException('Unable to get instance lists');
    }
  };

  getCondorNodeStatus = async (instanceId: string) => {
    try {
      const command = this.makeSendCommandCommand(instanceId, 'condor_status');

      const sendCommandResponse = await this.ssmClient.send(command);

      const getCommandInvocation = new GetCommandInvocationCommand({
        CommandId: sendCommandResponse.Command.CommandId,
        InstanceId: instanceId,
      });

      const splitedLine = this.splitInfoLines(
        await this.fetchInvocationResponse(getCommandInvocation),
        'compute.internal',
      );

      return splitedLine.map((line) => {
        const [
          name,
          operatingSystem,
          architecture,
          state,
          activity,
          loadAverage,
          memory,
          activityTime,
        ] = line.split(/\s+/);
        return new NodeStatus(
          name,
          operatingSystem,
          architecture,
          state,
          activity,
          loadAverage,
          memory,
          activityTime,
        );
      });
    } catch (error) {
      console.error('Error get Node status', error);
      throw new InternalServerErrorException('Unable to get Node status');
    }
  };

  getCondorTotalStatus = async (instanceId: string) => {
    try {
      const command = this.makeSendCommandCommand(instanceId, 'condor_status');

      const sendCommandResponse = await this.ssmClient.send(command);

      const getCommandInvocation = new GetCommandInvocationCommand({
        CommandId: sendCommandResponse.Command.CommandId,
        InstanceId: instanceId,
      });

      const splitedLine = this.splitInfoLines(
        await this.fetchInvocationResponse(getCommandInvocation),
        'Total',
      );

      return splitedLine.map((line) => {
        const [
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          nullValue,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          nullValue2,
          machines,
          owner,
          claimed,
          unclaimed,
          matched,
          preempting,
          drain,
        ] = line.split(/\s+/);
        return new TotalStatus(
          machines,
          owner,
          claimed,
          unclaimed,
          matched,
          preempting,
          drain,
        );
      });
    } catch (error) {
      console.error('Error get Node status', error);
      throw new InternalServerErrorException('Unable to get Node status');
    }
  };

  getCondorQueue = async (instanceId: string) => {
    try {
      const command = this.makeSendCommandCommand(instanceId, 'condor_q');

      const sendCommandResponse = await this.ssmClient.send(command);

      const getCommandInvocation = new GetCommandInvocationCommand({
        CommandId: sendCommandResponse.Command.CommandId,
        InstanceId: instanceId,
      });

      const splitedLine = this.splitInfoLines(
        await this.fetchInvocationResponse(getCommandInvocation),
        'ec2-user ID',
      );

      return splitedLine.map((line) => {
        const [
          owner,
          batchName,
          batchName2,
          submitted,
          submitted2,
          done,
          run,
          idle,
          total,
          jobIds,
        ] = line.split(/\s+/);

        return new QueueModel(
          owner,
          batchName + ' ' + batchName2,
          submitted + ' ' + submitted2,
          done,
          run,
          idle,
          total,
          jobIds,
        );
      });
    } catch (error) {
      console.error('Error get Node status', error);
      throw new InternalServerErrorException('Unable to get Node status');
    }
  };

  // TODO: Refactor this
  getCondorDetailStatus = async (instanceId: string) => {
    try {
      const command = this.makeSendCommandCommand(instanceId, 'condor_status');

      const sendCommandResponse = await this.ssmClient.send(command);

      const getCommandInvocation = new GetCommandInvocationCommand({
        CommandId: sendCommandResponse.Command.CommandId,
        InstanceId: instanceId,
      });

      const splitedLine = this.splitInfoLines(
        await this.fetchInvocationResponse(getCommandInvocation),
        'Total',
      );

      return splitedLine.map((line) => {
        const [
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          nullValue,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          nullValue2,
          machines,
          owner,
          claimed,
          unclaimed,
          matched,
          preempting,
          drain,
        ] = line.split(/\s+/);
        return new TotalStatus(
          machines,
          owner,
          claimed,
          unclaimed,
          matched,
          preempting,
          drain,
        );
      });
    } catch (error) {
      console.error('Error get Node status', error);
      throw new InternalServerErrorException('Unable to get Node status');
    }
  };

  private delay() {
    return new Promise((resolve) => setTimeout(resolve, 2000));
  }

  private fetchInvocationResponse = async (
    commandInvocation: GetCommandInvocationCommand,
  ) => {
    await this.delay();
    const invocationResponse = await this.ssmClient.send(commandInvocation);
    console.log(invocationResponse.StandardOutputContent);
    return invocationResponse.StandardOutputContent;
  };

  private makeSendCommandCommand(instanceId: string, customCommand: string) {
    const command = new SendCommandCommand({
      InstanceIds: [instanceId],
      DocumentName: 'AWS-RunShellScript',
      Parameters: {
        commands: [customCommand],
      },
    });
    return command;
  }

  private splitInfoLines(paragraph: string, includeString: string) {
    return paragraph.split('\n').filter((line) => line.includes(includeString));
  }
}
