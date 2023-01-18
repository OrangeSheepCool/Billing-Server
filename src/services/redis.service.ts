import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';

import { ConfigConstant } from '@/constants';

const {
  REDIS_CONFIG: { token, ...options },
} = ConfigConstant;

@Injectable()
export class RedisService {
  public redis: Redis;

  constructor(private readonly configService: ConfigService) {
    this.redis = new Redis({
      ...(configService.get<Config.Redis>(token) || options),
    });
  }

  async getCache(key: string): Promise<any> {
    let val: string | null = null;
    try {
      val = await this.redis.get(key);
      return val ? JSON.parse(val) : val;
    } catch (error) {
      // console.log(error);
      return val;
    }
  }

  async setCache(key: string, val: any, seconds?: number): Promise<'OK'> {
    try {
      if (typeof val === 'object') {
        val = JSON.stringify(val);
      }
      if (seconds) {
        return await this.redis.set(key, val, 'EX', seconds);
      }
      return await this.redis.set(key, val);
    } catch (error) {
      // console.log(error);
      return 'OK';
    }
  }
}