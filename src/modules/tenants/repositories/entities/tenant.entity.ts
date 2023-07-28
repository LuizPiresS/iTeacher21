import { Tenant } from '@prisma/client';

export class TenantEntity implements Tenant {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
