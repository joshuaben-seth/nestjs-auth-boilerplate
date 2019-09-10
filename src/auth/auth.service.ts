import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dto/login.dto';
import { UserService } from '../user/user.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {

    constructor(private userService: UserService, private jwtService: JwtService) {

    }

    async validateUserByPassword(loginAttempt: LoginDto) {
        const userToAttempt = await this.userService.findOneByUsername(loginAttempt.username);

        return new Promise((resolve) => {

            // Check the supplied password against the hash stored for this email address
            userToAttempt.checkPassword(loginAttempt.password, (err: any, isMatch: any) => {
                if (err) { resolve({
                    status: 401,
                    message: 'Unauthorized User',
                }); }
                if (isMatch) {
                    // If there is a successful match, generate a JWT for the user
                    resolve(this.createJwtPayload(userToAttempt));

                } else {
                    resolve({
                        status: 401,
                        message: 'Unauthorized User',
                    });
                }

            });

        });

    }

    // Validate User By JWT
    async validateUserByJwt(payload: JwtPayload) {

        // This will be used when the user has already logged in and has a JWT
        const user = await this.userService.findOneByUsername(payload.username);

        if (user) {
            return this.createJwtPayload(user);
        } else {
            throw new UnauthorizedException();
        }

    }

    createJwtPayload(user: any) {

        const data: JwtPayload = {
            username: user.username,
        };

        const jwt = this.jwtService.sign(data);

        return {
            expiresIn: 3600,
            token: jwt,
        };

    }

}
