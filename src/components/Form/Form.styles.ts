import styled from 'styled-components/native';

const Button = styled.TouchableOpacity`
  background-color: #103930;
  border-radius: 5px;
  width: 100px;
  heigh: 60px;
  margin-top: 10px;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
  `;

const Container = styled.View`
  justify-content: center;
  align-items: center;
  padding-bottom: 70px;
`;

const Field = styled.TextInput`
  display: flex;
  flex-direction: row;
  background-color: white;
  border-radius: 5px;
  border: 2px solid #103930;
  width: 240px;
  height: 50px;
  padding: 15px
  justify-content: center;
  align-items: center;
`;

export const Forms = {
  Container,
  Button,
  Field,
  ButtonText,
};
