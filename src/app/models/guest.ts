import { InviteStatus } from './enums/invite-status.enum';

export class Guest {
  public readonly id: string;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly email: string;
  public readonly cermonyStatus: InviteStatus;
  public readonly cocktailStatus: InviteStatus;
  public readonly dinerStatus: InviteStatus;
  public readonly brunchStatus: InviteStatus;
  public readonly plusOneId: string;
  public readonly childrenIds: string[];

  public toString(): string {
    return `${this.firstName}${this.lastName ? ` ${this.lastName}` : ''}`;
  }

  public static sortByLastName(a: Guest, b: Guest): number {
    return a.lastName.localeCompare(b.lastName);
  }
}
