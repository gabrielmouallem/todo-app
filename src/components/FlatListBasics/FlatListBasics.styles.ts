import styled from 'styled-components/native';
import LottieView from 'lottie-react-native';

const Container = styled.View`
    justify-content: center;
    align-items: center;
    padding-bottom: 30px;
`;

const Content = styled.View`
    background-color: #8AD5C4;
    max-height: 50px;
    margin: 15px;
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    padding: 15px;
    margin-left: auto;
    margin-right: auto;
    position-relative;
`;

const Item = styled.Text`
    font-size: 15px;
    margin-right: 15px;
    color: #103930;
    font-weight: bold;
`;

const Checkbox = styled(LottieView)`
    width: 30px;
    heigth: 30px;
`;

const Delete = styled(LottieView)`
    width: 30px;
    heigth: 30px;
`;

export const FLBasics = {
    Container,
    Content,
    Item,
    Checkbox,
    Delete
}