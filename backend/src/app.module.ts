import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { ReservasModule } from './reservas/reservas.module';
import { LocalesModule } from './locales/locales.module';
import { ServiciosExtraModule } from './servicios-extra/servicios-extra.module';
import { ReservaServicioModule } from './reserva-servicio/reserva-servicio.module';
import { PagosModule } from './pagos/pagos.module';
import { LogsAccesoModule } from './logs-acceso/logs-acceso.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({

      type: 'mysql',

      host: 'localhost',

      port: 3306,

      username: 'root',

      password: '11540667Swhn',

      database: 'sistemas_eventos',

      autoLoadEntities: true,

      synchronize: true,
      

    })
    ,
    UsuariosModule,
    AuthModule,
    ReservasModule,
    LocalesModule,
    ServiciosExtraModule,
    ReservaServicioModule,
    PagosModule,
    LogsAccesoModule
  ],
})
export class AppModule {}