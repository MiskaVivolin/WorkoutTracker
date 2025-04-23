import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Themes } from '../../assets/styles/Themes'
import { useTheme } from '../context/ThemeContext'
import { LogoProps } from '../types/componentProps'

const Logo = ({viewStyle, textStyle}: LogoProps) => {

  const { theme } = useTheme()

  return (
    <View style={[styles.headerContainer, viewStyle, {backgroundColor: Themes[theme].primary}]}>
      <Text style={[styles.header, textStyle, {color: Themes[theme].secondaryText}]}>Workout Tracker</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
},
  header: {
    fontSize: 30,
    fontFamily: 'BlackOpsOne-Regular',
  }
})

export default Logo;