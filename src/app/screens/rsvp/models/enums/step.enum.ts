export enum Step {
  Welcome,
  GuestSelection,
  Email,
  Ceremony,
  Cocktail,
  Diner,
  Brunch,
  PlusOneWelcome,
  PlusOneEmail,
  PlusOneCeremony,
  PlusOneCocktail,
  PlusOneDiner,
  PlusOneBrunch,
  Recap,
}
export namespace Step {
  export function translate(step: Step): string {
    switch (step) {
      case Step.Ceremony:
        return 'Cérémonie religieuse';
      case Step.Cocktail:
        return 'Cocktail';
      case Step.Diner:
        return 'Dîner';
      case Step.Brunch:
        return 'Brunch';
      default:
        return 'unknonw step';
    }
  }
}
