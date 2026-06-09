import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ServiciosExtraService } from './servicios-extra.service';
import { CreateServicioExtraDto } from './dto/create-servicio-extra.dto';

@Controller('servicios-extra')
@UseGuards(AuthGuard('jwt'))
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
        @Body() body: CreateServicioExtraDto
    ) {
        return this.service.create(body);
    }
}