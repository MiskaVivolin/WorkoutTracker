import React from 'react';
import { Platform, View } from 'react-native';
import Navbar from '../components/navigation/NavBar';
import { LoginScreenProps } from '../types/screenProps';
import LoginContainer from "../components/auth/LoginContainer";
import Logo from '../components/Logo';


const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {

  const mobileView = Platform.OS === 'android' || Platform.OS === 'ios';

  return (
    <>
      {mobileView ?
        <View style={{ flex: 1 }}>
          <Logo />
          <LoginContainer navigation={navigation}/>
        </View>
        :
        <View style={{ flex: 1 }}>
          <Navbar navigation={navigation} />
          <LoginContainer navigation={navigation} />
        </View>
      }
    </>
  );
};

export default LoginScreen;