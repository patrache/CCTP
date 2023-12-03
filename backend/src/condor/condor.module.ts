import { Module } from '@nestjs/common';
import { CondorController } from './condor.controller';
import { CondorService } from './condor.service';
import { AwsModule } from 'src/aws/aws.module';

@Module({
  imports: [AwsModule],
  controllers: [CondorController],
  providers: [CondorService],
})
export class CondorModule {}
