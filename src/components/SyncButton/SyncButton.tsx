import {useNetInfo} from '@react-native-community/netinfo';
import React from 'react';
import loading from '../../assets/loading.json';
import {SButton} from './SyncButton.styles';

function SyncButton() {
  const [load, setload] = React.useState(false);
  const {isConnected} = useNetInfo();
  const animateLottieLoad = React.useRef(null);

  React.useEffect(() => {
    if (isConnected) {
      if (load) {
        animateLottieLoad.current.play(0, 44);
      }
    } else if (load === true) {
      animateLottieLoad.current.play();
      setTimeout(() => {
        animateLottieLoad.current.reset();
      }, 8000);
    }
  }, [load]);

  return (
    <SButton.Container onPress={() => setload(!load)}>
      <SButton.Sync
        source={loading}
        autoPlay={false}
        loop={false}
        resizeMode="cover"
        ref={animateLottieLoad}
      />
    </SButton.Container>
  );
}

export default React.memo(SyncButton);
