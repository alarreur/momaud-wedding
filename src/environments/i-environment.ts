export const SMALLSCREEN_WIDTH_BREAKPOINT = 801;
export const RSVP_TRANSITION_DELAY = 1000;

export interface IEnvironment {
  production: boolean;
  useEmulators: boolean;
  firebase: any;
  adminBaseApi: string;
  smallScreenBreakpoint: number;
  rsvpTransitionDelay: number;
}
