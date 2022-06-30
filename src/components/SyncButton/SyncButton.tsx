import React from 'react';
import loading from '../../assets/loading.json';
import { useSync } from '../../hooks/useSync';
import { SButton } from './SyncButton.styles';

function SyncButton() {
  const { syncUpData, syncDownData } = useSync();
  const animateLottieLoad = React.useRef(null);

  const handleSync = () => {
    animateLottieLoad.current.play(0, 44);
    syncUpData();
    syncDownData();
  };

  return (
    <SButton.Container onPress={handleSync}>
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
