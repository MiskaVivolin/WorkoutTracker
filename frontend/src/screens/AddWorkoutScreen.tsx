import React, { useState } from 'react';
import { View } from 'react-native';
import { WorkoutItem, AddWorkoutScreenProps, } from '../types/Types';
import FormContainer from '../components/FormContainer';
import Navbar from '../components/Navbar';


const AddWorkoutScreen: React.FC<AddWorkoutScreenProps> = ({ navigation }) => {
  
  const [workoutList, setWorkoutList] = useState<WorkoutItem[]>([])
  const [workoutItem, setWorkoutItem] = useState({ _id: 0, user: '', name: '', date: '', exercise: '', result: '' })
  const [workoutItemIsValid, setWorkoutItemIsValid] = useState({ name: true, date: true, exercise: true, result: true })
  
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
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