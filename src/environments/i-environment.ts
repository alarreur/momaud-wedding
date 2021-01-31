export const SMALLSCREEN_WIDTH_BREAKPOINT = 801;

export interface IEnvironment {
  production: boolean;
  useEmulators: boolean;
  firebase: any;
  adminBaseApi: string;
  smallScreenBreakpoint: number;
}
