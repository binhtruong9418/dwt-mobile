import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';

type IConnectionInterface = {
  userInfo: any;
  currentTabManager: number;
};

const initialState: IConnectionInterface = {
  userInfo: null,
  currentTabManager: 0,
};

const connectionSlice = createSlice({
  name: 'connection',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      AsyncStorage.setItem('user', JSON.stringify(action.payload)).then();
      state.userInfo = action.payload;
    },
    setCurrentTabManager: (state, action) => {
      state.currentTabManager = action.payload;
    },
  },
});

const {actions, reducer} = connectionSlice;
export const {setUserInfo, setCurrentTabManager} = actions;

export default reducer;
