import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { AwsModule } from './aws/aws.module';
import { ConfigModule } from '@nestjs/config';
import { Ec2Module } from './ec2/ec2.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CommonModule,
    AwsModule,
    Ec2Module,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
