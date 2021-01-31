import { InjectionToken, Provider } from '@angular/core';

export const SMALL_SCREEN_BREAKPOINT = new InjectionToken('small-screen-breakpoint');

export const smallScreenProvider = (width: number) =>
  <Provider>{
    provide: SMALL_SCREEN_BREAKPOINT,
    useValue: width,
  };
