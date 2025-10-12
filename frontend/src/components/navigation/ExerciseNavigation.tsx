import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NavButton from './NavButton'

const ExerciseNavigation = () => {
  return (
    <View style={{flexDirection: 'row', paddingTop: 10}}>
        <NavButton
          title='Bench'
          onPress={() => console.log('nav test')}
        />
        <NavButton
          title='Squat'
          onPress={() => console.log('nav test')}
        />
        <NavButton
          title='Deadlift'
          onPress={() => console.log('nav test')}
        />
    </View>
  )
}

export default ExerciseNavigation

const styles = StyleSheet.create({})