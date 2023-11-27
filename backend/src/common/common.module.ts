import { Module } from '@nestjs/common';
import { CommonController } from './common.controller';
import { CommonService } from './common.service';
import { AwsModule } from 'src/aws/aws.module';

@Module({
  imports: [AwsModule],
  controllers: [CommonController],
  providers: [CommonService],
})
export class CommonModule {}
