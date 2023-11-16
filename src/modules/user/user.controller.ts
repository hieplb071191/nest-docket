import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { EmailService } from '../email/email.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RoleGuards } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/Common/roles.enum';
import { User } from 'src/decorators/user.decorator';

@Controller('user')
export class UserController {
    constructor(
        private readonly service: UserService,
        private mailService: EmailService
    ){}

    @Post()
    createUser(@Body() dto) {
        return this.service.createUser(dto)
    }

    @Post('send-mail')
    @UseGuards(JwtAuthGuard)
    @Roles([Role.ADMIN])
    @UseGuards(RoleGuards)
    sendMailTest() {
        return this.mailService.sendMail({data: {url: 'google.com'}, templateName: 'hello.template.handlebars', subject: 'test', emailLists: ['good.boy.0991@yopmail.com']})
    }

    @Get('info')
    @UseGuards(JwtAuthGuard)
    getInfo(@User() user) {
        return this.service.getInfo(user)
    }
}
