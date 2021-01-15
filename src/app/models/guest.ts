import { stringToArray } from 'ag-grid-community';
import { GuestDto } from './dtos';
import { GuestCategory } from './enums/guest-category.enum';
import { Host } from './enums/host.enum';
import { InviteStatus } from './enums/invite-status.enum';

export class Guest {
  public readonly id: string;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly email: string;
  public readonly ceremonyStatus: InviteStatus;
  public readonly cocktailStatus: InviteStatus;
  public readonly dinerStatus: InviteStatus;
  public readonly brunchStatus: InviteStatus;
  public readonly plusOneId: string;
  public readonly parentId: string;
  public readonly category: GuestCategory;
  public readonly invitedBy: Host;

  public get fullName(): string {
    return this.lastName ? `${this.firstName} ${this.lastName}` : this.firstName;
  }

  constructor(dto: Partial<GuestDto>) {
    this.id = dto.id;
    this.firstName = dto.firstName;
    this.lastName = dto.lastName;
    this.email = dto.email;
    this.category = dto.category;
    this.invitedBy = dto.invitedBy;
    this.ceremonyStatus = dto.ceremonyStatus;
    this.cocktailStatus = dto.cocktailStatus;
    this.dinerStatus = dto.dinerStatus;
    this.brunchStatus = dto.brunchStatus;
    this.plusOneId = dto.plusOneId;
    this.parentId = dto.parentId;
  }

  public isSearchCandidate(searchTerm: string): boolean {
    return (
      searchTerm &&
      searchTerm.length &&
      [this.firstName, this.lastName, this.email].some(
        (property) => property && property.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
      )
    );
  }

  public isDuplicate(guest: Guest): boolean {
    // guests with the same firstName are not duplicates if they don't have a lastname
    return (
      this.lastName &&
      guest.lastName &&
      this.firstName &&
      guest.firstName &&
      this.firstName.toLowerCase() === guest.firstName.toLowerCase() &&
      this.lastName.toLowerCase() === guest.lastName.toLowerCase()
    );
  }

  public toDto(): GuestDto {
    return {
      brunchStatus: this.brunchStatus,
      category: this.category,
      ceremonyStatus: this.ceremonyStatus,
      cocktailStatus: this.cocktailStatus,
      dinerStatus: this.dinerStatus,
      email: this.email,
      firstName: this.firstName,
      invitedBy: this.invitedBy,
      lastName: this.lastName,
      parentId: this.parentId,
      plusOneId: this.plusOneId,
    };
  }

  public static sortByLastName(a: Guest, b: Guest): number {
    return a.lastName.localeCompare(b.lastName);
  }
}
