import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {User} from '../../domain/User';
import {RootState} from '../store';

export interface UserState {
  currentUser: User | null;
}

const initialState: UserState = {
  currentUser: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
  },
});

export const {setUser} = userSlice.actions;

export const selectUser = (state: RootState) => state.user.currentUser;

export default userSlice.reducer;
