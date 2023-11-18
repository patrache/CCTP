import { Module } from '@nestjs/common';
import { Ec2Module } from './ec2/ec2.module';
import { AwsModule } from './aws/aws.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), Ec2Module, AwsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
