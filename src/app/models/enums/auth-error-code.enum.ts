export enum AuthErrorCode {
  AccountExistsWithDifferentCredential = 'auth/account-exists-with-different-credential',
  InvalidCredential = 'auth/invalid-credential',
  OperationNotAllowed = 'auth/operation-not-allowed',
  UserDisabled = 'auth/user-disabled',
  UserNotFound = 'auth/user-not-found',
  WrongPassword = 'auth/wrong-password',
  InvalidVerificationCode = 'auth/invalid-verification-code',
  InvalidVerificationId = 'auth/invalid-verification-id',
}
