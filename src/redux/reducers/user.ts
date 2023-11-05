import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {User} from '../../domain/User';
import {RootState} from '../store';
import {client} from '../../services/api';

const URL = `https://dummyjson.com/users`;

export interface UserState {
  currentUser: User | null;
  users: Array<User> | [];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | undefined;
}

const initialState: UserState = {
  currentUser: null,
  users: [],
  status: 'idle',
  error: undefined,
};

export const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  async (query: string) => {
    const response = await client(URL + query);
    return response;
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload.users;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {setUser} = userSlice.actions;

export const selectUser = (state: RootState) => state.user.currentUser;
export const selectAllUsers = (state: RootState) => state.user.users;
export const selectStatus = (state: RootState) => state.user.status;
export const selectError = (state: RootState) => state.user.error;

export default userSlice.reducer;
