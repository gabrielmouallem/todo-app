import styled from 'styled-components/native';

const Container = styled.TouchableOpacity`
  background-color: #3e8777;
  border-radius: 5px;
  padding: 0 15px;
  min-width: 100px;
  margin-top: 10px;
  justify-content: center;
  align-items: center;
  border: 2px solid #103930;
`;

const Text = styled.Text`
  color: white;
  font-weight: bold;
`;

export const CButton = {
  Container,
  Text
}