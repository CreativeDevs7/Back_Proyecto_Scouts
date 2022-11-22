import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MysqlModule } from './mysql.module';
import { Modules } from './modules';

@Module({
  imports: [
    MysqlModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    Modules
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {


}
