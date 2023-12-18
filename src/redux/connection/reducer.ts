import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';

type IConnectionInterface = {
  userInfo: any;
};

const initialState: IConnectionInterface = {
  userInfo: null,
};

const connectionSlice = createSlice({
  name: 'connection',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      AsyncStorage.setItem('user', JSON.stringify(action.payload)).then();
      state.userInfo = action.payload;
    },
  },
});

const {actions, reducer} = connectionSlice;
export const {setUserInfo} = actions;

export default reducer;
