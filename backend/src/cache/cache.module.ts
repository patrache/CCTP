import { Module, forwardRef } from '@nestjs/common';
import { CacheService } from './cache.service';
import { AutoScaleModule } from 'src/auto-scale/auto-scale.module';

@Module({
  imports: [forwardRef(() => AutoScaleModule)],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
