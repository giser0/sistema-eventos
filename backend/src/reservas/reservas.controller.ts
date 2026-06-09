import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Param,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request, Response } from 'express';

import { ReservasService } from './reservas.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateEstadoDto } from './dto/update-estado.dto';

const PDFDocument = require('pdfkit');

@Controller('reservas')
@UseGuards(AuthGuard('jwt')) // 🔐 PROTECCIÓN GLOBAL
export class ReservasController {
  constructor(
    private readonly reservasService: ReservasService,
  ) {}

  // 🔥 TODAS LAS RESERVAS (ADMIN)
  @Get()
  obtenerReservas() {
    return this.reservasService.obtenerReservas();
  }

  // 🔥 DASHBOARD
  @Get('dashboard')
  obtenerDashboard() {
    return this.reservasService.obtenerDashboard();
  }

  // 🔥 PENDIENTES DE PAGO
  @Get('pendientes-pago')
  obtenerPendientesPago() {
    return this.reservasService.obtenerPendientesPago();
  }

  // 🔥 MIS RESERVAS (CLIENTE)
  @Get('mis-reservas')
  obtenerMisReservas(
    @Req() request: Request & { user: any },
  ) {
    return this.reservasService.obtenerMisReservas(
      request.user.id, // 🔥 USUARIO DEL TOKEN
    );
  }

  // 🔥 CREAR RESERVA (CLIENTE)
  @Post()
  crearReserva(
    @Req() request: Request & { user: any },
    @Body() body: CreateReservaDto,
  ) {
    return this.reservasService.crearReserva({
      ...body,
      usuario: request.user.id, // 🔥 CLAVE
    });
  }

  // 🔥 CAMBIAR ESTADO (ADMIN)
  @Patch(':id')
  cambiarEstado(
    @Param('id') id: string,
    @Body() body: UpdateEstadoDto,
  ) {
    return this.reservasService.cambiarEstado(
      Number(id),
      body.estado,
    );
  }

  // 🔥 ELIMINAR (LÓGICO)
  @Patch('eliminar/:id')
  eliminarReserva(
    @Param('id') id: string,
  ) {
    return this.reservasService.eliminarReserva(
      Number(id),
    );
  }

  // 🔥 PDF (ADMIN)
  @Get('reporte/pdf')
  async generarPDF(
    @Res() response: Response,
  ) {
    const reservas =
      await this.reservasService.obtenerReservas();

    const doc = new PDFDocument({ margin: 40 });

    response.setHeader(
      'Content-Type',
      'application/pdf',
    );
    response.setHeader(
      'Content-Disposition',
      'attachment; filename=reporte_reservas.pdf',
    );

    doc.pipe(response);

    doc.fontSize(22).text(
      'REPORTE DE RESERVAS',
      { align: 'center' },
    );

    doc.moveDown(2);

    reservas.forEach((reserva: any) => {
      doc.fontSize(14).text(
        `Reserva #${reserva.id_reserva}`,
        { underline: true },
      );

      doc.text(`Cliente: ${reserva.usuario?.nombre || 'N/A'}`);
      doc.text(`Evento: ${reserva.tipo_evento}`);
      doc.text(`Fecha: ${reserva.fecha_evento}`);
      doc.text(`Hora: ${reserva.hora_evento}`);
      doc.text(`Estado: ${reserva.estado}`);
      doc.text(`Total: Bs. ${reserva.total_pago}`);
      doc.moveDown(1);
    });

    doc.end();
  }
}