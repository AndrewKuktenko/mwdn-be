import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfig, mysqlConfig } from './config';

/** Module */
import { ImagesModule } from './modules/images/images.module';

/** Entity */
import { Image } from './modules/images/entities/image.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, mysqlConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('mysql.host'),
        port: +configService.get('mysql.port'),
        username: configService.get('mysql.username'),
        password: configService.get('mysql.password'),
        database: configService.get('mysql.database'),
        entities: [Image],
        synchronize: true,
      }),
    }),
    ImagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
