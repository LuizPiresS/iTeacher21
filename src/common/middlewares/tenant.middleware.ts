import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response as ExpressResponse, NextFunction } from 'express';
import { LoggerService } from '../loggers/domain/logger.service';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggerService) {}

  use(req: Request, res: ExpressResponse, next: NextFunction) {
    const tenantId = req.headers['x-tenant-id'];

    if (!tenantId) {
      this.logger.contextName = `${TenantMiddleware.name}.use`;
      this.logger.error('Tenant ID not found in header.');
      return res
        .status(400)
        .json({ message: 'Tenant ID not found in header.' });
    }

    req['tenantId'] = tenantId;

    next();
  }
}
