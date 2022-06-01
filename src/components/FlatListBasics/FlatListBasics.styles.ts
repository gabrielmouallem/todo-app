import styled from 'styled-components/native';

const Container = styled.View`
    justify-content: center;
    align-items: center;
    padding-bottom: 70px;
`;

const Content = styled.View`
    background-color: #8AD5C4;
    height: 50px;
    margin: 15px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    padding: 15px;
`;

const Item = styled.Text`
    font-size: 15px;
    color: #103930;
    font-weight: bold;
`;

export const FLBasics = {
    Container,
    Content,
    Item,
}