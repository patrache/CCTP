export class Ec2DetailInfoModel {
  constructor(
    public instanceName?:string,
    public instanceId?: string,
    public imageName?: string,
    public imageId?: string,
    public instanceType?: string,
    public state?: string,
    public publicDNS?: string,
    public publicIP?: string,
    public privateDNS?: string,
    public privateIP?: string,
    public zone?: string,
    public keyName?: string,
    public launchedTime?: Date,
    public securityGroup?: string,
    public cpuCore?: number
  ) {}
}
