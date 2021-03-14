export enum InviteStatus {
  NotInvited = 'NOT_INVITED',
  Invited = 'INVITED',
  Attends = 'ATTENDS',
  Absent = 'ABSENT',
}

export namespace InviteStatus {
  export function toString(status: InviteStatus): string {
    switch (status) {
      case InviteStatus.Invited:
        return 'Invité';
      case InviteStatus.NotInvited:
        return 'Non-invité';
      case InviteStatus.Absent:
        return 'Absent';
      case InviteStatus.Attends:
        return 'Présent';
      default:
        return '';
    }
  }

  export function getIcon(status: InviteStatus): string {
    switch (status) {
      case InviteStatus.Invited:
        return 'pi pi-envelope';
      case InviteStatus.NotInvited:
        return 'pi pi-ban';
      case InviteStatus.Absent:
        return 'pi pi-thumbs-down';
      case InviteStatus.Attends:
        return 'pi pi-thumbs-up';
      default:
        return '';
    }
  }
}
