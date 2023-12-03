import { Controller, Get, Param } from '@nestjs/common';
import { CondorService } from './condor.service';

@Controller('condor')
export class CondorController {
  constructor(private condorService: CondorService) {}

  @Get('/masterlist')
  async getMasterList() {
    return await this.condorService.getMasterList();
  }

  @Get('/status/node/:masterId')
  async getCondorNodeStatus(@Param() params: any) {
    return await this.condorService.getCondorNodeStatus(params.masterId);
  }

  @Get('/status/total/:masterId')
  async getCondorTotalStatus(@Param() params: any) {
    return await this.condorService.getCondorTotalStatus(params.masterId);
  }
}
