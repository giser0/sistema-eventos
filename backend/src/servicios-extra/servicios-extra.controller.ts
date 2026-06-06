import { Controller, Get, Post, Body } from '@nestjs/common';
import { ServiciosExtraService } from './servicios-extra.service';
import { CreateServicioExtraDto }
from './dto/create-servicio-extra.dto';
@Controller('servicios-extra')
export class ServiciosExtraController {

    constructor(
        private service: ServiciosExtraService
    ) {}

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Post()
    create(
  @Body()
  body: CreateServicioExtraDto
) {
        return this.service.create(body);
    }
}