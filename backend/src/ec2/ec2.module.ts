import { Module } from '@nestjs/common';
import { Ec2Controller } from './ec2.controller';
import { Ec2Service } from './ec2.service';
import { AwsModule } from 'src/aws/aws.module';

@Module({
  imports: [AwsModule],
  controllers: [Ec2Controller],
  providers: [Ec2Service],
})
export class Ec2Module {}
