import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const getTypeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  // host: configService.get<string>('POSTGRES_HOST'),
  host: 'postgres',
  port: configService.get<number>('POSTGRES_PORT'),
  username: configService.get<string>('POSTGRES_USER'),
  password: configService.get<string>('POSTGRES_PASSWORD'),
  database: configService.get<string>('POSTGRES_DB'),
  entities: [__dirname + '/../**/*.entity.{ts, js}'],
  synchronize: configService.get<boolean>('TYPEORM_SYNCHRONIZE'),
  autoLoadEntities: true,
  namingStrategy: new SnakeNamingStrategy(),
  logging: true,
  extra: {
    timezone: 'UTC',
  },
});
