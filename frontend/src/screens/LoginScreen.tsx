import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { LoginScreenProps } from '../types/screenProps';
import LoginContainer from "../components/auth/LoginContainer";
import Logo from '../components/Logo';
import { Themes } from '../../assets/styles/Themes';
import { useTheme } from '../context/ThemeContext';


const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {

  const { theme } = useTheme();
  const mobileView = Platform.OS === 'android' || Platform.OS === 'ios';

  return (
    <View style={[styles.loginScreenContainer,{ backgroundColor: Themes[theme].background}]}>
      {mobileView ?
        <View style={{ flex: 1 }}>
          <Logo textStyle={{marginBottom: 5}}/>
          <LoginContainer navigation={navigation}/>
        </View>
        :
        <View style={{ flex: 1 }}>
          <Logo viewStyle={styles.logoContainer}/>
          <LoginContainer navigation={navigation}/>
        </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  loginScreenContainer: {
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

export default LoginScreen;