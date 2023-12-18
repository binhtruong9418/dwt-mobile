import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {useCallback} from 'react';
import {setUserInfo} from './reducer';

export const useConnection = () => {
  const connection = useSelector((state: RootState) => state.connection);
  const dispatch = useDispatch();

  const onSetUserInfo = useCallback(
    (user: any) => {
      dispatch(setUserInfo(user));
    },
    [dispatch],
  );

  return {connection, onSetUserInfo};
};
