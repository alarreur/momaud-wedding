import { stringToArray } from 'ag-grid-community';
import { GuestCategory } from '../enums/guest-category.enum';
import { Host } from '../enums/host.enum';
import { InviteStatus } from '../enums/invite-status.enum';

export interface GuestDto {
  readonly id?: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly ceremonyStatus: InviteStatus;
  readonly cocktailStatus: InviteStatus;
  readonly dinerStatus: InviteStatus;
  readonly brunchStatus: InviteStatus;
  readonly plusOneId: string;
  readonly parentId: string;
  readonly category: GuestCategory;
  readonly invitedBy: Host;
}
