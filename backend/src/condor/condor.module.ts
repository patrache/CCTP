import { Module } from '@nestjs/common';
import { CondorController } from './condor.controller';
import { CondorService } from './condor.service';
import { AwsModule } from 'src/aws/aws.module';
import { CacheModule } from 'src/cache/cache.module';

@Module({
  imports: [AwsModule, CacheModule],
  controllers: [CondorController],
  providers: [CondorService],
})
export class CondorModule {}
