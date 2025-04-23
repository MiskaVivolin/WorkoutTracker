import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { SignupScreenProps } from '../types/screenProps';
import SignupContainer from '../components/auth/SignupContainer';
import Logo from '../components/Logo';
import { Themes } from '../../assets/styles/Themes';
import { useTheme } from '../context/ThemeContext';


const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {
    
  const { theme } = useTheme();
  const mobileView = Platform.OS === 'android' || Platform.OS === 'ios';

  return (
    <View style={[styles.signupScreenContainer,{ backgroundColor: Themes[theme].background}]}>
      {mobileView ?
        <View style={{ flex: 1 }}>
          <Logo textStyle={{marginBottom: 5}}/>
          <SignupContainer navigation={navigation}/>
        </View>
        :
        <View style={{ flex: 1 }}>
          <Logo viewStyle={styles.logoContainer}/>
          <SignupContainer navigation={navigation}/>
        </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  signupScreenContainer: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  logoContainer: {
    alignItems: "flex-start", 
    paddingVertical: 10, 
    paddingLeft: 20
  }
})

export default SignupScreen;
