import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth/auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { Purse } from '../purse/purse';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private authService: AuthService, private kolo: Purse) {

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: kolo.secret,
        });

    }

    async validate(payload: JwtPayload) {

        const user = await this.authService.validateUserByJwt(payload);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;

    }

}
