import React, { useState } from 'react';
import { View } from 'react-native';
import { AddWorkoutScreenProps } from '../types/screenProps';
import FormContainer from '../components/FormContainer';
import Navbar from '../components/Navbar';
import { Themes } from '../../assets/styles/Themes'
import { useTheme } from '../context/ThemeContext';


const AddWorkoutScreen: React.FC<AddWorkoutScreenProps> = ({ navigation }) => {
  
  const [workoutItem, setWorkoutItem] = useState({ id: 0, name: '', date: '', exercise: '', result: '' })
  const { theme } = useTheme();

  return (
    <View style={{flex: 1, backgroundColor: Themes[theme].background}}>
        <View>
        <Navbar navigation={navigation} showButtons={true} addButtonToggle={false}/>
        <View>
          <FormContainer workoutItem={workoutItem} setWorkoutItem={setWorkoutItem}/>
        </View>
      </View>
    </View>
  )
}

export default AddWorkoutScreen;