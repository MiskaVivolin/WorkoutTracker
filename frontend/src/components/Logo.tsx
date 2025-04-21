import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Themes } from '../../assets/styles/Themes'
import { useTheme } from '../context/ThemeContext'

const Logo = () => {

  const { theme } = useTheme()

  return (
    <View style={[styles.headerContainer, {backgroundColor: Themes[theme].primary}]}>
      <Text style={[styles.header, {color: Themes[theme].secondaryText}]}>Workout Tracker</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingBottom: 5,
    alignItems: 'center',
},
  header: {
    fontSize: 30,
    fontFamily: 'BlackOpsOne-Regular',
  }
})

export default Logo;