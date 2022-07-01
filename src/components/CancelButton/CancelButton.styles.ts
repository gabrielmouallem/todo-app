import styled from 'styled-components/native';

const Container = styled.TouchableOpacity`
  background-color: white;
  border-radius: 5px;
  padding: 0 15px;
  min-width: 100px;
  margin-top: 10px;
  justify-content: center;
  align-items: center;
  border: 2px solid #D60003;
`;

const Text = styled.Text`
  color: #D60003;
  font-weight: bold;
`;

export const CButton = {
  Container,
  Text
}