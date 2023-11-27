import { Module } from '@nestjs/common';
import { CommonController } from './common.controller';
import { CommonService } from './common.service';
import { AwsModule } from 'src/aws/aws.module';
import { CacheModule } from 'src/cache/cache.module';

@Module({
  imports: [AwsModule, CacheModule],
  controllers: [CommonController],
  providers: [CommonService],
})
export class CommonModule {}
