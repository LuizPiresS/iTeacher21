import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../common/base-repository/base-repository';
import { Tenant } from '@prisma/client';

@Injectable()
export class TenantsRepository extends BaseRepository<Tenant> {
  protected getModelName(): string {
    return 'tenant';
  }
}
