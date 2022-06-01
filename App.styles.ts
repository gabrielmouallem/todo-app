import styled from 'styled-components/native';

const SafeView = styled.SafeAreaView`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const Container = styled.View`
    justify-content: center;
    align-items: center;
    padding-bottom: 70px;
`;

export const Todo =  {
    SafeView,
    Container
}