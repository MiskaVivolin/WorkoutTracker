import { Platform, StyleSheet, Text, View, Dimensions } from 'react-native'
import { Themes } from '../../assets/styles/Themes'
import { useTheme } from '../context/ThemeContext'
import { LogoProps } from '../types/componentProps'

const Logo = ({viewStyle}: LogoProps) => {

  const { theme } = useTheme()
  const mobileView = Platform.OS === 'android' || Platform.OS === 'ios';

  return (
    <View style={[styles.headerContainer, viewStyle, {backgroundColor: Themes[theme].primary}]}>
      <Text style={[styles.header, {color: Themes[theme].logoText}]}>Workout Tracker</Text>
      {mobileView ? <View style={{marginBottom: 5}}></View>:<View></View>}
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: Dimensions.get('window').width < 500 ? 5 : 10,
  },
  header: {
    fontSize: 30,
    fontFamily: 'BlackOpsOne-Regular',
  }
})

export default Logo;