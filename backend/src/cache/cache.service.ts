import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { AutoScaleService } from 'src/auto-scale/auto-scale.service';

@Injectable()
export class CacheService {
  private cache: Map<string, any>;

  constructor(
    @Inject(forwardRef(() => AutoScaleService))
    private autoScaleService: AutoScaleService,
  ) {
    this.cache = new Map();
    this.set('scaledInstance', []);
  }

  set(key: string, value: any) {
    if (key === 'idleCount') this.autoScaleService.checkAutoScale();
    this.cache.set(key, value);
  }

  get(key: string): any {
    return this.cache.get(key);
  }

  has(key: string): boolean {
    return this.cache.has(key);
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }
}
