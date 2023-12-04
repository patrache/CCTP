import { Module, forwardRef } from '@nestjs/common';
import { AutoScaleService } from './auto-scale.service';
import { AwsModule } from 'src/aws/aws.module';
import { CacheModule } from 'src/cache/cache.module';

@Module({
  imports: [AwsModule, forwardRef(() => CacheModule)],
  exports: [AutoScaleService],
  providers: [AutoScaleService],
})
export class AutoScaleModule {}
