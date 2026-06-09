import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Res,
  Patch
} from '@nestjs/common';
import { CreatePagoDto }
  from './dto/create-pago.dto';
import type {
  Response
} from 'express';

import { PagosService }
  from './pagos.service';

@Controller('pagos')

export class PagosController {

  constructor(
    private service: PagosService
  ) { }

  //  CREAR
  @Post()

  crear(
    @Body()
    body: CreatePagoDto
  ) {

    return this.service.crear(body);

  }

  //  LISTAR
  @Get()

  findAll() {

    return this.service.findAll();

  }

  //  ELIMINAR
  @Patch('eliminar/:id')

  eliminarPago(

    @Param('id')
    id: string

  ) {

    return this.service.eliminarPago(
      Number(id)
    );

  }

  //  PDF
  @Get('comprobante/:id')

  async generarComprobante(

    @Param('id')
    id: string,

    @Res()
    res: Response

  ) {

    const pdfBuffer =
      await this.service.generarComprobante(
        Number(id)
      );

    res.set({

      'Content-Type':
        'application/pdf',

      'Content-Disposition':
        'attachment; filename=comprobante.pdf',

      'Content-Length':
        pdfBuffer.length,

    });

    res.end(pdfBuffer);

  }

}