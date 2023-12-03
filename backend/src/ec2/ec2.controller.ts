import { Controller, Get, Param } from '@nestjs/common';
import { Ec2Service } from './ec2.service';

@Controller('ec2')
export class Ec2Controller {
  constructor(private ec2Service: Ec2Service) {}

  @Get('/instancelist')
  async getInstanceList() {
    return await this.ec2Service.getInstancesList();
  }

  @Get('/instanceDetail/info/:id')
  async getInstanceInfo(@Param() params: any) {
    return await this.ec2Service.getInstanceDetailInfo(params.id);
  }

  @Get('operation/start/:id')
  async startInstance(@Param() params: any) {
    const response = await this.ec2Service.startInstance(params.id);
    return response;
  }

  @Get('operation/reboot/:id')
  async rebootInstance(@Param() params: any) {
    const response = await this.ec2Service.rebootInstance(params.id);
    return response;
  }

  @Get('operation/stop/:id')
  async stopInstance(@Param() params: any) {
    const response = await this.ec2Service.stopInstance(params.id);
    return response;
  }

  @Get('operation/delete/:id')
  async deleteInstance(@Param() params: any) {
    const response = await this.ec2Service.deleteInstance(params.id);
    return response;
  }

  @Get('operation/create/:instancename/:imagename')
  async createInstance(@Param() params: any) {
    const response = await this.ec2Service.createInstance(
      params.instancename,
      params.imagename,
    );
    return response;
  }
}
