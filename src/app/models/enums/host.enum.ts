export enum Host {
  Maud = 'Maud',
  Amaury = 'Amaury',
  MPGE = 'MP & GE',
  BeaXavier = 'Béatrice & Xavier',
}

export namespace Host {
  export function toString(status: Host): string {
    switch (status) {
      case Host.Maud:
        return 'Maud';
      case Host.Amaury:
        return 'Amaury';
      case Host.MPGE:
        return 'MP & GE';
      case Host.BeaXavier:
        return 'Béa & Xav';
      default:
        return '';
    }
  }
}
