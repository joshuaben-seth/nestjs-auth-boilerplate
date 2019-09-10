import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Purse } from './purse/purse';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

const kolo = new Purse();

@Module({
  imports: [
    MongooseModule.forRoot(
      kolo.mongo,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
      },
      ),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
