export class TenantSendValidationEmailEvent {
  constructor(
    readonly name: string,
    readonly email: string,
    readonly token: string,
  ) {}
}
