export enum GuestCategory {
  Friend = 'Friend',
  Family = 'Family',
}

export namespace GuestCategory {
  export function toString(status: GuestCategory): string {
    switch (status) {
      case GuestCategory.Family:
        return 'Famille';
      case GuestCategory.Friend:
        return 'Amis';
      default:
        return '';
    }
  }
}
