import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Param,
  Req,
  UseGuards
} from '@nestjs/common';

import { UsuariosService } from './usuarios.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('usuarios')
export class UsuariosController {

  constructor(
    private readonly usuariosService: UsuariosService
  ) { }

  @Post()
  crearUsuario(
    @Body() body: any
  ) {
    return this.usuariosService.crear(body);
  }

  @Get()
  obtenerUsuarios() {
    return this.usuariosService.obtenerTodos();
  }

  //  PERFIL
  @UseGuards(AuthGuard('jwt'))
  @Get('perfil')
  obtenerPerfil(@Req() request: any) {
    return this.usuariosService.obtenerPerfil(
      request.user.id
    );
  }

  //  EDITAR PERFIL
  @UseGuards(AuthGuard('jwt'))
  @Patch('perfil')
  editarPerfil(
    @Req() request: any,
    @Body() body: any
  ) {
    return this.usuariosService.editarPerfil(
      request.user.id,
      body
    );
  }

  //  CAMBIAR PASSWORD
  @UseGuards(AuthGuard('jwt'))
  @Patch('cambiar-password')
  cambiarPassword(
    @Req() request: any,
    @Body() body: { password: string }
  ) {
    return this.usuariosService.cambiarPassword(
      request.user.id,
      body.password
    );
  }

  //  EDITAR USUARIO ADMIN
  @Patch(':id')
  editarUsuario(
    @Param('id') id: string,
    @Body() body: any
  ) {
    return this.usuariosService.editar(
      Number(id),
      body
    );
  }

  //  ELIMINAR
  @Patch('eliminar/:id')
  eliminarUsuario(
    @Param('id') id: string
  ) {
    return this.usuariosService.eliminar(
      Number(id)
    );
  }

}