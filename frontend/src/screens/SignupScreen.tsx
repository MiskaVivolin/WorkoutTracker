import React from 'react';
import { View } from 'react-native';
import { SignupScreenProps } from '../types/screenProps';
import Navbar from '../components/Navbar';
import SignupContainer from '../components/auth/SignupContainer';


const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {
    
  return (
    <View style={{ flex: 1 }}>
      <Navbar navigation={navigation} showButtons={false} />
      <SignupContainer navigation={navigation} />
    </View>
  );
};

export default SignupScreen;
