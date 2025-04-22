import React from 'react';
import { Platform, View } from 'react-native';
import { SignupScreenProps } from '../types/screenProps';
import NavBar from '../components/navigation/NavBar';
import SignupContainer from '../components/auth/SignupContainer';
import Logo from '../components/Logo';


const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {
    
  const mobileView = Platform.OS === 'android' || Platform.OS === 'ios';

  return (
    <>
      {mobileView ?
        <View style={{ flex: 1 }}>
          <Logo />
          <SignupContainer navigation={navigation} />
        </View>
        :
        <View style={{ flex: 1 }}>
          <NavBar navigation={navigation} />
          <SignupContainer navigation={navigation} />
        </View>
      }
    </>
  );
};

export default SignupScreen;
