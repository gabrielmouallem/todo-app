import {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import App from '../../App';

interface IUseNetInfo {
  isConnected: boolean;
}

export const useNetInfo = (): IUseNetInfo => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return isConnected;
};