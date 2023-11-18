import { Ec2Service } from './ec2.service';
import { Controller, Get } from '@nestjs/common';

@Controller('ec2')
export class Ec2Controller {
  constructor(private ec2Service: Ec2Service) {}

  @Get('/available/region')
  getAvailableRegion() {
    return this.ec2Service.getAvailableRegion();
  }

  @Get('/available/zone')
  getAvailableZone() {
    return this.ec2Service.getAvailableZone();
  }

  @Get('/imageList')
  getImageList() {
    return this.ec2Service.getImageList();
  }
}
