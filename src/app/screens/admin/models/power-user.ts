export interface PowerUser {
  uid: string;
  displayName: string | null;
  email: string | null;
  emailVerified: boolean;
  disabled: boolean;
  isAnonymous: boolean;
  metadata: { creationTime: string; lastSignInTime: string };
  multiFactor: {};
  phoneNumber: string | null;
  photoURL: string | null;
  providerData: {
    displayName: string | null;
    email: string | null;
    phoneNumber: string | null;
    photoURL: string | null;
    providerId: string;
    uid: string;
  }[];
  providerId: string;
  refreshToken: string;
  tenantId: string | null;
}
