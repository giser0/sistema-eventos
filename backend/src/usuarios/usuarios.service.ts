import {
  Injectable,
  BadRequestException
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Usuario } from './entities/usuario/usuario';

@Injectable()
export class UsuariosService {

  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>
  ) {}
// ✅ OBTENER TODOS
async obtenerTodos() {

  return this.usuarioRepository.find({
    where: {
      activo: true
    },
    order:{
      id_usuario: 'DESC'
    }
  });

}

// ✅ CREAR USUARIO
async crear(data: any) {

  const existe =
    await this.usuarioRepository.findOne({
      where: {
        email: data.email
      }
    });

  if (existe) {

    throw new BadRequestException(
      'El correo ya existe'
    );

  }

  const passwordHash =
    await bcrypt.hash(
      data.password,
      10
    );

  const nuevoUsuario =
    this.usuarioRepository.create({

      nombre: data.nombre,

      email: data.email,

      telefono: data.telefono || "",

      password: passwordHash,

      rol: data.rol,

      activo: true

    });

  const guardado =
    await this.usuarioRepository.save(
      nuevoUsuario
    );

  const { password, ...user } =
    guardado;

  return user;

}

// ✅ EDITAR USUARIO
async editar(
  id_usuario: number,
  data: any
) {

  const usuario =
    await this.usuarioRepository.findOne({
      where: {
        id_usuario
      }
    });

  if (!usuario) {

    throw new BadRequestException(
      'Usuario no encontrado'
    );

  }

  if (data.nombre)
    usuario.nombre = data.nombre;

  if (data.email)
    usuario.email = data.email;

  if (data.rol)
    usuario.rol = data.rol;

  const actualizado =
    await this.usuarioRepository.save(
      usuario
    );

  const { password, ...user } =
    actualizado;

  return user;

}

// ✅ ELIMINAR USUARIO
async eliminar(
  id_usuario: number
) {

  const usuario =
    await this.usuarioRepository.findOne({
      where: {
        id_usuario
      }
    });

  if (!usuario) {

    throw new BadRequestException(
      'Usuario no encontrado'
    );

  }

  usuario.activo = false;

  await this.usuarioRepository.save(
    usuario
  );

  return {
    mensaje:
      'Usuario desactivado'
  };

}
  // 🔍 PERFIL
  async obtenerPerfil(id_usuario: number) {
    const usuario = await this.usuarioRepository.findOne({
      where: { id_usuario, activo: true },
    });

    if (!usuario) {
      throw new BadRequestException('Usuario no encontrado');
    }

    const { password, ...user } = usuario;
    return user;
  }

  // ✏️ EDITAR PERFIL
  async editarPerfil(
    id_usuario: number,
    data: Partial<Usuario>
  ) {
    const usuario = await this.usuarioRepository.findOne({
      where: { id_usuario, activo: true },
    });

    if (!usuario) {
      throw new BadRequestException('Usuario no encontrado');
    }

    if (data.nombre) usuario.nombre = data.nombre;
    if (data.email) usuario.email = data.email;
    if (data.telefono) usuario.telefono = data.telefono;

    const actualizado =
      await this.usuarioRepository.save(usuario);

    const { password, ...user } = actualizado;
    return user;
  }

  // 🔐 CAMBIAR CONTRASEÑA
  async cambiarPassword(
    id_usuario: number,
    password: string
  ) {
    if (!password || password.length < 6) {
      throw new BadRequestException(
        'La contraseña debe tener al menos 6 caracteres'
      );
    }

    const usuario = await this.usuarioRepository.findOne({
      where: { id_usuario, activo: true },
    });

    if (!usuario) {
      throw new BadRequestException('Usuario no encontrado');
    }

    usuario.password = await bcrypt.hash(password, 10);
    await this.usuarioRepository.save(usuario);

    return {
      mensaje: 'Contraseña actualizada correctamente'
    };
  }
}