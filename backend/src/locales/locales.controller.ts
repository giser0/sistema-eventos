import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Param,
  UseGuards
} from '@nestjs/common';

import { LocalesService } from './locales.service';
import { UpdateLocalDto } from './dto/update-local.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('locales')
export class LocalesController {

  constructor(
    private readonly localesService: LocalesService
  ) {}

  @Get()
  obtenerLocales() {
    return this.localesService.obtenerLocales();
  }

  // 🔥 NUEVO
  @Get(':id')
  obtenerLocalPorId(
    @Param('id') id: string
  ) {
    return this.localesService.obtenerLocalPorId(
      Number(id)
    );
  }

  @Post()
  crearLocal(@Body() body: any) {
    return this.localesService.crearLocal(body);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  editarLocal(
    @Param('id') id: string,
    @Body() body: UpdateLocalDto
  ) {
    return this.localesService.editarLocal(
      Number(id),
      body
    );
  }
}