import { ExtractJwt, Strategy,  } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy)  {
  constructor(
    private readonly authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRECT,
    });
  }

  async validate(payload: any, request: Request) {
    const checkUser = await this.authService.validateJwtAuth(payload)
    if (!checkUser) {
      return checkUser
    }
    return {...payload, roles: ['admin']};
  }
}