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
}
