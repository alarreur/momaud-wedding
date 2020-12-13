import { Guest, InviteStatus } from '@app/models';

export const guestListMock = <Guest[]>[
  {
    id: 'amauryId',
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
