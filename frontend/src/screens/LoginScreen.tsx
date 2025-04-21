import React from 'react';
import { View } from 'react-native';
import Navbar from '../components/navigation/NavBar';
import { LoginScreenProps } from '../types/screenProps';
import LoginContainer from "../components/auth/LoginContainer";


const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {

  return (
    <View style={{ flex: 1 }}>
      <Navbar navigation={navigation} />
      <LoginContainer navigation={navigation}/>
    </View>
  );
};

export default LoginScreen;