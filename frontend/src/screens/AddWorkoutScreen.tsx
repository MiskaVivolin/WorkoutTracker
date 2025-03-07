import React, { useState } from 'react';
import { View } from 'react-native';
import { WorkoutItem, AddWorkoutScreenProps, } from '../types/Types';
import FormContainer from '../components/FormContainer';
import Navbar from '../components/Navbar';
import { Themes } from '../../assets/styles/Themes'
import { useTheme } from '../context/ThemeContext';


const AddWorkoutScreen: React.FC<AddWorkoutScreenProps> = ({ navigation }) => {
  
  const [workoutList, setWorkoutList] = useState<WorkoutItem[]>([])
  const [workoutItem, setWorkoutItem] = useState({ _id: 0, username: '', name: '', date: '', exercise: '', result: '' })
  const [workoutItemIsValid, setWorkoutItemIsValid] = useState({ name: true, date: true, exercise: true, result: true })
  const { theme } = useTheme();

  return (
    <View style={{flex: 1, backgroundColor: Themes[theme].background}}>
        <View>
        <Navbar navigation={navigation} showButtons={true} addButtonToggle={false}/>
        <View>
          <FormContainer workoutItem={workoutItem} setWorkoutItem={setWorkoutItem} workoutItemFieldIsValid={workoutItemIsValid} setWorkoutItemFieldIsValid={setWorkoutItemIsValid} setWorkoutList={setWorkoutList}/>
        </View>
      </View>
    </View>
  )
}

export default AddWorkoutScreen;