import { Controller, Post, Body } from '@nestjs/common';
import { TenantsService } from '../../domain/tenants.service';
import { Tenant } from '.prisma/client';
import { TenantInputDto } from '../dtos/tenant.input.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Tenants')
@Controller('tenants')
@ApiBearerAuth('JWT')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Post()
  async createTenant(@Body() input: TenantInputDto): Promise<Tenant> {
    return this.tenantsService.createTenant(input);
  }
}
