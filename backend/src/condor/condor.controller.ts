import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CondorService } from './condor.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { readFileSync } from 'fs';

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

  @Get('/status/queue/:masterId')
  async getCondorQueueStatus(@Param() params: any) {
    return await this.condorService.getCondorQueue(params.masterId);
  }

  // TODO: service 만들기 -> ssm으로 command 보내기
  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
      }),
    }),
  )
  uploadFile(@UploadedFile() file, @Res() res) {
    const filePath = file.path;
    const fileContent = readFileSync(filePath, 'utf8');
    const cleanedContent = fileContent.replace(/\s+/g, ' ');

    res.send(cleanedContent);
  }
}
