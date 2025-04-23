import React, { useState } from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { AddWorkoutScreenProps } from '../types/screenProps';
import AddWorkoutForm from '../components/AddWorkoutForm';
import TabBar from '../components/navigation/TabBar';
import NavBar from '../components/navigation/NavBar';
import Logo from '../components/Logo';
import { Themes } from '../../assets/styles/Themes';
import { useTheme } from '../context/ThemeContext';


const AddWorkoutScreen: React.FC<AddWorkoutScreenProps> = ({ navigation }) => {
  
  const [workoutItem, setWorkoutItem] = useState({ id: 0, name: '', date: '', exercise: '', result: '' })
  const { theme } = useTheme();

  const mobileView = Platform.OS === 'android' || Platform.OS === 'ios'

  return (
    <View style={[styles.container,{ backgroundColor: Themes[theme].background}]}>
      {mobileView ?
        <View style={{flex: 1}}>
          <Logo textStyle={{marginBottom: 5}}/>
           <AddWorkoutForm workoutItem={workoutItem} setWorkoutItem={setWorkoutItem}/>
          <TabBar navigation={navigation}/>
        </View>
      :
        <View style={{flex: 1}}>
          <NavBar navigation={navigation} />
          <AddWorkoutForm workoutItem={workoutItem} setWorkoutItem={setWorkoutItem}/>
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%'
  }
})

export default AddWorkoutScreen;