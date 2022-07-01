import styled from 'styled-components/native';

const Backdrop = styled.View`
  flex: 1;
  align-content: center;
  justify-content: center;
  background-color: rgba(0,0,0,0.5);
`;

const Container = styled.View`
  width: 90%;
  height: auto;
  background-color: white;
  border-radius: 25px;
  align-self: center;
`;

const Header = styled.View`
  position: relative;
  background-color: #ECECEC;
  height: 125px;
  background-color: #ECECEC;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
`;

const ButtonContainer = styled.TouchableOpacity`
  position: absolute;
  right: 25px;
  top: 20px;
`;

const ButtonText = styled.Text`
  font-size: 30px;
  font-weight: bold;
  opacity: 0.3;
`;

const Title = styled.Text`
  font-size: 40px;
  font-weight: bold;
  text-align: center;
`;

export const CButton = {
  Container: ButtonContainer,
  Text: ButtonText,
}

export const CModal = {
  Backdrop,
  Container,
  Header,
  Title
}