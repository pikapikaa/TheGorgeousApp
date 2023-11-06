import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {User} from '../../../domain/User';
import {RootState} from '../store';
import {client} from '../../api';

const URL = `https://dummyjson.com/users`;

export interface UserState {
  currentUser: User | null;
  users: Array<User> | [];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  statusPagination: 'loading' | 'succeeded';
  error: string | undefined;
  loadMore: boolean;
  skip: number;
}

const initialState: UserState = {
  currentUser: null,
  users: [],
  status: 'idle',
  error: undefined,
  loadMore: true,
  statusPagination: 'succeeded',
  skip: 0,
};

const fetchAsyncThunk = (prefix: string) => {
  return createAsyncThunk(prefix, async (query: string) => {
    const response = await client(URL + query);
    return response;
  });
};

export const fetchUsers = fetchAsyncThunk('user/fetchUsers');
export const fetchExtraUsers = fetchAsyncThunk('user/fetchExtraUsers');
export const fetchUserInfo = fetchAsyncThunk('user/fetchUserInfo');

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    setSkip: (state, action: PayloadAction<number>) => {
      state.skip = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload.users;
        state.loadMore = true;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchExtraUsers.pending, (state, action) => {
        state.statusPagination = 'loading';
      })
      .addCase(fetchExtraUsers.fulfilled, (state, action) => {
        state.statusPagination = 'succeeded';
        if (!action.payload.users.length) {
          state.loadMore = false;
        } else {
          action.payload.users.map((user: User) => {
            if (state.users.findIndex(sUser => sUser.id === user.id) === -1) {
              state.users.push(user);
            }
          });
        }
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      });
  },
});

export const {setUser} = userSlice.actions;
export const {setSkip} = userSlice.actions;

export const selectUser = (state: RootState) => state.user.currentUser;
export const selectAllUsers = (state: RootState) => state.user.users;
export const selectStatus = (state: RootState) => state.user.status;
export const selectError = (state: RootState) => state.user.error;
export const selectLoadMore = (state: RootState) => state.user.loadMore;
export const selectStatusPagination = (state: RootState) =>
  state.user.statusPagination;
export const selectSkip = (state: RootState) => state.user.skip;

export default userSlice.reducer;
