import { Guest, GuestCategory, Host, InviteStatus } from '@app/models';

export const guestListMock = <Guest[]>[
  {
    id: 'amauryId',
    category: GuestCategory.Family,
    invitedBy: Host.Amaury,
    brunchStatus: InviteStatus.Invited,
    ceremonyStatus: InviteStatus.Invited,
    dinerStatus: InviteStatus.Invited,
    cocktailStatus: InviteStatus.Invited,
    email: 'dummy.amaury@email.com',
    firstName: 'Amaury',
    lastName: 'Larreur',
    plusOneId: 'maudId',
  },
  {
    id: 'maudId',
    category: GuestCategory.Family,
    invitedBy: Host.Maud,
    brunchStatus: InviteStatus.Invited,
    ceremonyStatus: InviteStatus.Invited,
    dinerStatus: InviteStatus.Invited,
    cocktailStatus: InviteStatus.Invited,
    email: 'dummy.maud@email.com',
    firstName: 'Maud',
    lastName: 'Michel',
    plusOneId: 'amauryId',
  },
];
