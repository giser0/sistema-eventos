import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {

  async enviarRecuperacion(
    email: string,
    token: string
  ) {

    const transporter =
      nodemailer.createTransport({

        service: 'gmail',

        auth: {

          user: process.env.EMAIL_USER,

          pass: process.env.EMAIL_PASS

        }

      });

    const enlace =

      `http://localhost:5173/reset-password?token=${token}`;

    await transporter.sendMail({

      from: process.env.EMAIL_USER,

      to: email,

      subject: 'Recuperar contraseña',

      html: `

        <h2>Recuperación de contraseña</h2>

        <p>Haz clic en el siguiente enlace:</p>

        <a href="${enlace}">
          Recuperar contraseña
        </a>

      `

    });

  }

}