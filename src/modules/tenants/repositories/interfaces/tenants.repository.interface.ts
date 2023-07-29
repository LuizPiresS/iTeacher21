import { IBaseRepository } from '../../../../common/base-repository/interfaces/base.repository.interface';
import { Tenant } from '@prisma/client';

export type ITenantsRepository = IBaseRepository<Tenant>;
