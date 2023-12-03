import { Controller, Get } from '@nestjs/common';
import { CondorService } from './condor.service';

@Controller('condor')
export class CondorController {
  constructor(private condorService: CondorService) {}

  @Get('/masterlist')
  async getMasterList() {
    return await this.condorService.getMasterList();
  }
}
