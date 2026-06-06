import {
  Body,
  Controller,
  Post,
  Req,
  Get,
  Query,
  Patch
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('login')
  login(
    @Body() body: LoginDto,
    @Req() request: any
  ) {
    return this.authService.login(
      body.email,
      body.password,
      request
    );
  }

  @Post('logout')
  logout(@Req() request: any) {
    return this.authService.logout(request);
  }

  @Get('buscar-email')
  buscarPorEmail(
    @Query('email') email: string
  ) {
    return this.authService.buscarPorEmail(email);
  }

  @Post('forgot-password')
  forgotPassword(
    @Body() body: { email: string }
  ) {
    return this.authService.forgotPassword(body.email);
  }

  @Patch('reset-password')
  resetPassword(
    @Body()
    body: { token: string; password: string }
  ) {
    return this.authService.resetPassword(
      body.token,
      body.password
    );
  }
}