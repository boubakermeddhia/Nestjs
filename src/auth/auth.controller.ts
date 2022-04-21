import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredientailsDto } from './dto/auth-credentials.dto';
import GetUser from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Post('/signup')
    signUp(@Body(ValidationPipe) AuthCredientailsDto: AuthCredientailsDto): Promise<void> {
        return this.authService.signUp(AuthCredientailsDto)
    }
    @Post('/signin')
    signIp(@Body(ValidationPipe) AuthCredientailsDto: AuthCredientailsDto): Promise<string> {
        return this.authService.signIn(AuthCredientailsDto)
    }

    // @Post('/test')
    // @UseGuards(AuthGuard())
    // test(@GetUser() user: User) {
    //     console.log(user)
    // }

}
