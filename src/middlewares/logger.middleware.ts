import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
   private logger: Logger = new Logger()
  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(req.baseUrl)
    this.logger.log(req.body)
    next();
  }
}
