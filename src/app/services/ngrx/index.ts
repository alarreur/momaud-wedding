// ngrx
import { ActionReducerMap } from '@ngrx/store';

// local
import { GuestState, GUEST_STATE_NAME } from './guest/guest.state';
import { reducer as guestReducer } from './guest/guest.reducer';
import { GuestEffects } from './guest/guest.effects';

export interface RootState {
  guests: GuestState;
}

export const rootReducers: ActionReducerMap<RootState> = {
  [GUEST_STATE_NAME]: guestReducer,
};

export const rootEffets = [GuestEffects];
