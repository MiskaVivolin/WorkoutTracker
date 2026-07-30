import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LoginScreenProps } from '../types/screenProps';
import LoginContainer from "../components/auth/LoginContainer";
import Logo from '../components/Logo';
import { Themes } from '../../assets/styles/Themes';
import { useTheme } from '../context/ThemeContext';


const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {

  const { theme } = useTheme();
  const mobileView = Dimensions.get('window').width < 500;

  return (
    <View style={[styles.loginScreenContainer,{ backgroundColor: Themes[theme].background}]}>
      {mobileView ?
        <View style={{ flex: 1 }}>
          <Logo />
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
  }
})

export default LoginScreen;