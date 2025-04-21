import React from 'react';
import { View } from 'react-native';
import { SignupScreenProps } from '../types/screenProps';
import NavBar from '../components/navigation/NavBar';
import SignupContainer from '../components/auth/SignupContainer';


const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {
    
  return (
    <View style={{ flex: 1 }}>
      <NavBar navigation={navigation} />
      <SignupContainer navigation={navigation} />
    </View>
  );
};

export default SignupScreen;
