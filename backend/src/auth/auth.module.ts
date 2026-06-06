import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';

import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';

import { AuthService } from './auth.service';
import { MailService } from './mail.service';

import { Usuario } from '../usuarios/entities/usuario/usuario';

import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LogAcceso }
from '../logs-acceso/entities/log-acceso';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario, LogAcceso]),
    JwtModule.register({
      secret: 'mi_clave_secreta',
      signOptions: { expiresIn: '1d' }
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    MailService,
    JwtAuthGuard
  ],
  exports: [
    JwtModule,
    JwtAuthGuard
  ]
})
export class AuthModule {}