export function assert(predicateThatMustBeTrue: boolean, errorMessage: string, failCallback?: () => void): void {
  if (!predicateThatMustBeTrue) {
    throw new Error(errorMessage);
  }
}
