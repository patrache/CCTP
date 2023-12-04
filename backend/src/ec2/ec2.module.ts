import { Module } from '@nestjs/common';
import { Ec2Controller } from './ec2.controller';
import { Ec2Service } from './ec2.service';
import { AwsModule } from 'src/aws/aws.module';
import { CacheModule } from 'src/cache/cache.module';

@Module({
  imports: [AwsModule, CacheModule],
  controllers: [Ec2Controller],
  exports: [Ec2Service],
  providers: [Ec2Service],
})
export class Ec2Module {}
