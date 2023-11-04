import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService
    ) {}

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request)
        if (!token) {
            throw new UnauthorizedException()
        }
        try {
            const payload = await this.jwtService.verifyAsync(token);
            if (!payload) {
                throw new UnauthorizedException()
            }
            request['user'] = payload;
            return true
        } catch (e) {
            throw new UnauthorizedException(e.message)
        }
        
    }

    private extractTokenFromHeader(request: any): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
    
}