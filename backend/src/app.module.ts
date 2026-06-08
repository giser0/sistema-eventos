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
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: Number(config.get('DB_PORT')),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASS'),
        database: config.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),

    UsuariosModule,
    AuthModule,
    ReservasModule,
    LocalesModule,
    ServiciosExtraModule,
    ReservaServicioModule,
    PagosModule,
    LogsAccesoModule,
  ],
})
export class AppModule {}