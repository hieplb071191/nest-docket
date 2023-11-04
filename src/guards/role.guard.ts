import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from 'src/Common/roles.enum';
import { ROLES_KEY } from 'src/decorators/role.decorator';
import { JwtAuthGuard } from './jwt-auth.guard';

@Injectable()
export class RoleGuards extends JwtAuthGuard {
    constructor(
        private readonly reflector: Reflector
    ){
        super()
    }

    async canActivate(context: ExecutionContext){
        await super.canActivate(context)
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
          }
          const request = context.switchToHttp().getRequest();
          console.log(request.user)
          return requiredRoles.some((role) =>{
            return request?.user?.roles?.includes(role)
          } ); 
    }
}
