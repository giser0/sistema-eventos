import {
  Body,
  Controller,
  Get,
  Post
} from '@nestjs/common';

import { LogsAccesoService }
  from './logs-acceso.service';

import { CreateLogAccesoDto }
  from './dto/create-log-acceso.dto';

@Controller('logs')

export class LogsAccesoController {

  constructor(
    private service: LogsAccesoService
  ) { }

  @Post()
  crear(

    @Body()
    body: CreateLogAccesoDto

  ) {

    return this.service.crearLog(body);

  }

  @Get()
  findAll() {

    return this.service.findAll();

  }

}