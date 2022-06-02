import styled from 'styled-components/native/';
import LottieView from 'lottie-react-native';

const Container = styled.TouchableOpacity`
    padding-top: 250px;
    z-index: 2;
`;

const Sync = styled(LottieView)`
    width: 120px;
    height: 150px;
    padding-bottom: 0;
`;

export const SButton = {
    Container,
    Sync
};