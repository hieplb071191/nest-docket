import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../user/repositories/users.repository';
import { CryptoProviderService } from '../../shared/services/crypto.service';
import { SignUpDto } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import { GoogleService } from '../../shared/services/google.service';
import { EmailService } from '../email/email.service';
import { AddressService } from '../address/address.service';
import * as moment from 'moment'


@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly cryptoService: CryptoProviderService,
        private readonly jwtService: JwtService,
        private readonly googleService: GoogleService,
        private readonly emailService: EmailService,
        private readonly addressService: AddressService
    ) {

    }

    async signup( dto: SignUpDto ) {
        const { password } = dto
        const hashPassword = await this.cryptoService.bcryptPassword(password)
        if (!password) {
            throw new BadRequestException('not password')
        }
        const oldUser = await this.userRepository.findAll({
            where: [
                {email: dto.email},
                {username: dto.username}
            ]
        })

        if (oldUser && oldUser.length) {
            throw new BadRequestException('user existed')
        }
        const {address} = dto
        const {dob} = dto
        delete dto.address
        let date = moment(dob)

        const payload =  await this.userRepository.create({...dto, password: hashPassword, dob: date})
        if (payload && address) {
            const addressModel = {
                lat: address.lat,
                long: address.long,
                province: address['province'] ? address['province'] : 'aaaaa',
                district: address['district'] ? address['district'] : 'aaaaa',
                ward: address['ward'] ? address['ward'] : 'aaaaa',
                specifically: address['specifically'] ? address['specifically'] : 'aaaaa',
    
            }
            await this.addressService.create(addressModel, payload)
        }
        const {username, email, isConfirm, loginSystem, isTwoFA, id} = payload;
        const token = await this.jwtService.signAsync(
            {
                username, 
                email, 
                isConfirm, 
                loginSystem, 
                isTwoFA, 
                id
            }, 
            {
                expiresIn: '3600s'
            }
        )
        const url = `http://localhost:3000/verify?token=${token}`
        await this.emailService.sendMail({data: {url}, templateName: 'hello.template.handlebars', subject: 'confirm account signup',emailLists: [email]})
        return {
            msg: 'we are send a email to register email, please confirm!!'
        }

    }

    async signinWithPassword(dto) {
        const { email, password } = dto;
        const user = await this.userRepository.getInfo(dto)

        if (!user) {
            throw new UnauthorizedException('user or password not correct')
        }

        const isAuthentication = await this.cryptoService.comparePassword(user.password, password)
        if (!isAuthentication) {
            throw new UnauthorizedException('user or password not correct') 
        }

        const payload = { id: user.id, isTwoFA: user.isTwoFA, username: user.username,email: user.email }
        const access_token = await this.jwtService.signAsync(payload)
        return {access_token};
    }

    async signinWithGoogle(token: string) {

        const info = await this.googleService.authenticate(token)
        if (!info) {
            throw new BadRequestException('has a error with google account')
        }
        const user = await this.userRepository.findOne({where: {email: info.email}})
        if (!user) {
            throw new BadRequestException({
                message: 'You need register account',
                data: {
                    email: info.email
                }
            })
        }
        const payload = { id: user.id, isTwoFA: user.isTwoFA, username: user.username,email: user.email }
        const access_token = await this.jwtService.signAsync(payload)
        return {access_token};

        
    }

    async signupWithGoogle(dto: any) {
        let { email, username, dob, address, isTwoFA = false } = dto;
        const user = await this.userRepository.findOne({where: [
            {email: email},
            { username: username }
        ]})
        if (user) {
            const payload = { id: user.id, isTwoFA: user.isTwoFA, username: user.username,email: user.email };
            const access_token = await this.jwtService.signAsync(payload);
            return {access_token};
        }
        dob = new Date(dob);
        const newUser = await this.userRepository.create({email,username, isTwoFA, dob});
        if (newUser && address) {
            const addressModel = {
                lat: address.lat,
                long: address.lng,
                province: address['province'] ? address['province'] : 'aaaaa',
                district: address['district'] ? address['district'] : 'aaaaa',
                ward: address['ward'] ? address['ward'] : 'aaaaa',
                specifically: address['specifically'] ? address['specifically'] : 'aaaaa',
    
            }
            await this.addressService.create(addressModel, newUser)
        }
        const payload = { id: newUser.id, isTwoFA: newUser.isTwoFA, username: newUser.username,email: newUser.email }
        const access_token = await this.jwtService.signAsync(payload);
        return {access_token};
    }

    async validateToken(token) {
        const payload = await this.jwtService.verifyAsync(token)
        return payload
    }

    async confirmAccount(dto) {
        const token = dto.token
        try {

            const payload = await this.jwtService.verifyAsync(token)
            if (!payload) {
                return false
            }
            const {email, id, isConfirm, isTwoFA, loginSystem, username} = payload
    
            return await this.userRepository.updateOne({id: payload.id}, {...{email, id, isConfirm, isTwoFA, loginSystem, username} , isConfirm: true})
        } catch (e) {
            throw new BadRequestException(e.message)
        }
    }

    async validateJwtAuth(payload) {
        const {id} = payload
        const user = await this.userRepository.findOne({where: { id }})
        return !!user
    }
}
