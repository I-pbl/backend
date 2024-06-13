import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getTypeOrmConfig } from './configs/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { ReceiverModule } from './receiver/receiver.module';
import { CustomerModule } from './customer/customer.module';
import { RequestModule } from './request/request.module';
import { HelperModule } from './helper/helper.module';
import { S3Module } from './s3/s3.module';
import { ProgressModule } from './progress/progress.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        getTypeOrmConfig(configService),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    UsersModule,
    PostModule,
    ReceiverModule,
    CustomerModule,
    RequestModule,
    HelperModule,
    S3Module,
    ProgressModule,
  ],
  controllers: [],
  exports: [],
})
export class AppModule {}
