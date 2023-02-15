import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';

import { REDIS_CONFIG } from '@/constants';

const { token, ...options } = REDIS_CONFIG;

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

  async setCache(
    key: string,
    val: string | number | Record<string, unknown>,
    seconds?: number,
  ): Promise<'OK' | 'Not OK'> {
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
      return 'Not OK';
    }
  }

  async delCache(...keys: string[]): Promise<number> {
    try {
      return await this.redis.del(keys);
    } catch (error) {
      // console.log(error);
      return 0;
    }
  }
}
