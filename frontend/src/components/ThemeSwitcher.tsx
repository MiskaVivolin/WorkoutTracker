import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { useTheme } from '../context/ThemeContext';
import Button from './Button';
import { Themes } from '../../assets/styles/Themes';

const ThemeSwitcher = () => {

    const { theme, setTheme } = useTheme();
    
    return (
    <View style={styles.themeContainer}>
      <Text style={[styles.title, {color: Themes[theme].defaultText}]}>Current theme: {theme}</Text>
      <View style={styles.buttonContainer}>
        <Button
          buttonStyle={{marginRight: Dimensions.get('window').width < 500 ? 0 : 50, width: 90}}
          title="Light" 
          onPress={() => setTheme('light')} 
          />
        <Button
          title="Dark"
          onPress={() => setTheme('dark')} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  themeContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: Dimensions.get('window').width < 500 ? "space-evenly" : "center",
  }, 
  title: {
    marginBottom: Dimensions.get('window').width < 500 ? 20 : 30, 
    fontFamily: 'Inter24',
    fontSize: Dimensions.get('window').width < 500 ? 18 : 20, 
  }
})

export default ThemeSwitcher