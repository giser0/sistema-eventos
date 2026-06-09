import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {

    console.log(
      'SECRET_WORD:',
      configService.get<string>('SECRET_WORD'),
    );
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('SECRET_WORD'),
    });
    
  }
  
  async validate(payload: any) {
    console.log('JWT PAYLOAD:', payload);
    return payload; // 👉 se guarda en req.user
  }
}