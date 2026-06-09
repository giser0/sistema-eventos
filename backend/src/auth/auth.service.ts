import {
  Injectable,
  UnauthorizedException
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import {
  Repository,
  LessThan
} from 'typeorm';

import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';

import { Usuario } from '../usuarios/entities/usuario/usuario';
import { LogAcceso } from '../logs-acceso/entities/log-acceso';

@Injectable()
export class AuthService {

  constructor(

    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,

    @InjectRepository(LogAcceso)
    private logRepository: Repository<LogAcceso>,

    private jwtService: JwtService
  ) {
    console.log('EMAIL_USER:', process.env.EMAIL_USER);
    console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'OK' : 'VACIO');
    this.transporter.verify()
      .then(() => console.log('Correo conectado correctamente'))
      .catch(err => console.log(err));
  }

  //  TRANSPORTER

  private transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,

    },


  });


  //  LOGIN
  async login(
    email: string,
    password: string,
    request: any
  ) {
    const usuario = await this.usuarioRepository.findOne({
      where: { email }
    });

    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    this.transporter.verify()
      .then(() => console.log('SMTP OK'))
      .catch(err => console.log('SMTP ERROR', err));
    const passwordValida = await bcrypt.compare(
      password,
      usuario.password
    );

    if (!passwordValida) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = {
      id: usuario.id_usuario,
      email: usuario.email,
      rol: usuario.rol
    };

    const token = this.jwtService.sign(payload);

    // LOG LOGIN
    await this.logRepository.save({
      id_usuario: usuario.id_usuario,
      evento: 'LOGIN',
      ip: request.ip,
      browser: request.headers['user-agent']
    });

    // LIMPIAR LOGS
    const fechaLimite = new Date();
    fechaLimite.setDate(fechaLimite.getDate() - 1);

    await this.logRepository.delete({
      fecha: LessThan(fechaLimite)
    });

    return {
      mensaje: 'Login correcto',
      token,
      usuario: {
        id: usuario.id_usuario,
        nombre: usuario.nombre,
        email: usuario.email,
        telefono: usuario.telefono,
        rol: usuario.rol
      }
    };
  }

  //  LOGOUT
  async logout(request: any) {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return { mensaje: 'No autorizado' };
    }

    const token = authHeader.split(' ')[1];
    const payload = this.jwtService.verify(token);

    await this.logRepository.save({
      id_usuario: payload.id,
      evento: 'LOGOUT',
      ip: request.ip,
      browser: request.headers['user-agent']
    });

    return { mensaje: 'Logout correcto' };
  }

  //  FORGOT PASSWORD
  async forgotPassword(email: string) {
    const usuario = await this.usuarioRepository.findOne({
      where: { email }
    });

    if (!usuario) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    const token = this.jwtService.sign(
      { email },
      { expiresIn: '15m' }
    );

    const enlace = `http://localhost:5173/reset-password/${token}`;

    await this.transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Recuperar contraseña',
      html: `
        <h2>Recuperación de contraseña</h2>
        <a href="${enlace}">Restablecer contraseña</a>
      `
    });

    return { mensaje: 'Correo enviado correctamente' };
  }

  //  RESET PASSWORD
  async resetPassword(token: string, password: string) {
    const payload = this.jwtService.verify(token);

    const usuario = await this.usuarioRepository.findOne({
      where: { email: payload.email }
    });

    if (!usuario) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    usuario.password = await bcrypt.hash(password, 10);

    await this.usuarioRepository.save(usuario);

    return { mensaje: 'Contraseña actualizada correctamente' };
  }
  async buscarPorEmail(email: string) {
    const usuario = await this.usuarioRepository.findOne({
      where: { email }
    });

    if (!usuario) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    return {
      id: usuario.id_usuario,
      nombre: usuario.nombre,
      email: usuario.email,
      telefono: usuario.telefono,
      rol: usuario.rol
    };
  }
}