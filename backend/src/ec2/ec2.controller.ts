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

  @Get('operation/start')
  async startInstance() {
    return { test: 'starting...' };
  }

  @Get('operation/reboot')
  async rebootInstance() {
    return { test: 'rebooting...' };
  }

  @Get('operation/stop')
  async stopInstance() {
    return { test: 'stopping...' };
  }

  @Get('operation/delete')
  async deleteInstance() {
    return { test: 'deleting...' };
  }

  @Get('operation/create')
  async createInstance() {
    return { test: 'creating...' };
  }
}
