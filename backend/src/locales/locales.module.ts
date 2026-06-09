import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Local } from './entities/local/local';
import { LocalesController } from './locales.controller';
import { LocalesService } from './locales.service';
import { AuthModule } from '../auth/auth.module'; // 👈 IMPORTANTE

@Module({
  imports: [
    TypeOrmModule.forFeature([Local]),
    AuthModule,
  ],
  controllers: [LocalesController],
  providers: [LocalesService],
})
export class LocalesModule { }