import { Module, ValidationPipe, MiddlewareConsumer } from '@nestjs/common';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { configuration } from '../config/configuration';
const cookieSession = require('cookie-session');

console.log(`${process.env.NODE_ENV}`);
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/config/env/${process.env.NODE_ENV}.env`,
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      // useFactory: async (configService: ConfigService) => ({
      //   type: configService.get('DATABASE_TYPE') as "sqlite",
      //   host: configService.get('DATABASE_HOST') as string,
      //   port: configService.get('DATABASE_PORT') as number,
      //   username: configService.get('DATABASE_USERNAME') as string,
      //   password: configService.get('DATABASE_PASSWORD') as string,
      //   database: configService.get('DATABASE_NAME') as string,
      //   entities: ['dist/**/*.entity{.ts,.js}'],
      //   synchronize: true,
      //   migrations: ['dist/migrations/*{.ts,.js}'],
      // }),
    }),

    UsersModule,

    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {
  constructor(private configService: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: [this.configService.get('COOKIE_KEY')],
        }),
      )
      .forRoutes('*');
  }
}
