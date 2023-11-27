import { IsString } from 'class-validator';

export class SummarizedEc2InstanceModel {
  @IsString()
  instanceName: string;

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
  zone: string;

  constructor(
    instanceName,
    imageName,
    instanceType,
    state,
    publicDNS,
    publicIP,
    zone,
  ) {
    this.instanceName = instanceName;
    this.imageName = imageName;
    this.instanceType = instanceType;
    this.state = state;
    this.publicDNS = publicDNS;
    this.publicIP = publicIP;
    this.zone = zone;
  }
}
