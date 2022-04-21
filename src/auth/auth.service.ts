import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredientailsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService

    ) { }

    async signUp(AuthCredientailsDto: AuthCredientailsDto): Promise<void> {
        return await this.userRepository.signUp(AuthCredientailsDto)
    }

    async signIn(AuthCredientailsDto: AuthCredientailsDto): Promise<string> {
        const username = await this.userRepository.validateUser(AuthCredientailsDto)
        if (!username) throw new UnauthorizedException('Invalid credentails')
        const payload: { username: string } = { username }
        const accessToken = await this.jwtService.sign(payload)
        return accessToken
    }
}
