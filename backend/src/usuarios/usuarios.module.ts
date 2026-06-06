import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtModule } from '@nestjs/jwt';

import { UsuariosController } from './usuarios.controller';

import { UsuariosService } from './usuarios.service';

import { Usuario } from './entities/usuario/usuario';

@Module({

  imports: [

    TypeOrmModule.forFeature([Usuario]),

    JwtModule.register({

      secret: 'mi_clave_secreta',

      signOptions: {
        expiresIn: '1d'
      }

    })

  ],

  controllers: [UsuariosController],

  providers: [UsuariosService],

})

export class UsuariosModule {}