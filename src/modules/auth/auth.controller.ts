import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto, SignUpWithGoogleDto, SigninWithGoogleDto, } from './dto/signup.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/decorators/user.decorator';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly service: AuthService
    ){}

    @Post('/signup')
    signupWithPassword(@Body() dto: SignUpDto) {
        return this.service.signup(dto)
    }

    @Post('/signin')
    signinWithPassword(@Body() dto: {email: string, password: string}) {
        console.log(dto)
        return this.service.signinWithPassword(dto)
    }

    @Get('google/redirect')
    @UseGuards(AuthGuard)
    getProfile() {
        return {msg: 'OK'}
    }

    @Post('/signinWithGoogle')
    async signinWithGoogle(@Body() dto: SigninWithGoogleDto, @User() user) {
        console.log(user)
        const result = this.service.signinWithGoogle(dto.credential)
        return result
    }

    @Post('/sign-with-google')
    async signupWithgoogle(@Body()dto: SignUpWithGoogleDto) {
        console.log(dto)
        const result = this.service.signupWithGoogle(dto)
        return result
    }

    @Post('/confim-account')
    confirmEmail(@Req() req: any) {
        return this.service.confirmAccount({token: req.body.token})
    }

}
