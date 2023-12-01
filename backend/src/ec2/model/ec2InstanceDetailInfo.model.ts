import { Instance } from '@aws-sdk/client-ec2';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class Ec2InstanceDetailInfo {
  @IsString()
  instanceName: string;

  @IsString()
  instanceId: string;

  @IsString()
  imageId: string;

  @IsString()
  imageName: string;

  @IsString()
  instanceType: string;

  @IsString()
  state: string;

  @IsString()
  publicDNS: string;

  @IsString()
  publicIP: string;

  @IsString()
  privateDNS: string;

  @IsString()
  privateIP: string;

  @IsString()
  zone: string;

  @IsString()
  keyName: string;

  @IsDate()
  launchedTime: Date;

  @IsString()
  securityGroup: string;

  @IsNumber()
  cpuCore: number;

  constructor(instance: Instance, imageName: string) {
    this.instanceName = instance.Tags[0].Value;
    this.instanceId = instance.InstanceId;
    this.imageName = imageName;
    this.imageId = instance.ImageId;
    this.instanceType = instance.InstanceType;
    this.state = instance.State.Name;
    this.publicDNS = instance.PublicDnsName ?? '-';
    this.publicIP = instance.PublicIpAddress ?? '-';
    this.privateDNS = instance.PrivateDnsName;
    this.privateIP = instance.PrivateIpAddress;
    this.zone = instance.Placement.AvailabilityZone;
    this.keyName = instance.KeyName;
    this.launchedTime = instance.LaunchTime;
    this.securityGroup = instance.NetworkInterfaces[0].Groups[0].GroupName;
    this.cpuCore = instance.CpuOptions.CoreCount;
  }
}
