export interface ITenantsQueue {
  tenantSendValidationEmail(
    name: string,
    email: string,
    token: string,
  ): Promise<void>;
}
