import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../../common/base-repository/base-repository';
import { Tenant } from '@prisma/client';
import { ITenantsRepository } from '../interfaces/tenants.repository.interface';

@Injectable()
export class TenantsRepository
  extends BaseRepository<Tenant>
  implements ITenantsRepository
{
  protected getModelName(): string {
    return 'tenant';
  }
}
