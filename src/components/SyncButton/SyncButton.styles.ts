import styled from 'styled-components/native/';
import LottieView from 'lottie-react-native';

const Container = styled.TouchableOpacity`
    /* margin-top: 250px; */
`;

const Sync = styled(LottieView)`
    width: 120px;
    height: 150px;
`;

export const SButton = {
    Container,
    Sync
};