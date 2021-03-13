export function assert(predicateThatMustBeTrue: boolean, errorMessage: string, failCallback?: () => void): void {
  if (!predicateThatMustBeTrue) {
    failCallback();
    throw new Error(errorMessage);
  }
}
