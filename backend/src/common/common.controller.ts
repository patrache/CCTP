import { CommonService } from './common.service';
import { Controller, Get } from '@nestjs/common';

@Controller('common')
export class CommonController {
  constructor(private commonService: CommonService) {}

  @Get('/region')
  getCurrentRegion() {
    return this.commonService.getCurrentRegion();
  }

  @Get('/available/region')
  getAvailableRegion() {
    return this.commonService.getAvailableRegion();
  }

  @Get('/available/zone')
  getAvailableZone() {
    return this.commonService.getAvailableZone();
  }

  @Get('/imageList')
  getImageList() {
    return this.commonService.getImageList();
  }
}
