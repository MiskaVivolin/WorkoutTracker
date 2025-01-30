import React, { useState } from 'react';
import { View } from 'react-native';
import { WorkoutItem, WorkoutListScreenProps } from '../types/Types';
import WorkoutList from '../components/WorkoutList';
import Navbar from '../components/Navbar';
import WorkoutEditor from '../components/WorkoutEditor';

const WorkoutListScreen: React.FC<WorkoutListScreenProps> = ({ navigation }) => {
  
  const [workoutList, setWorkoutList] = useState<WorkoutItem[]>([])
  const [isEditMode, setIsEditMode] = useState(false)
  const [workoutItem, setWorkoutItem] = useState<WorkoutItem>({ _id: 0, user: '', name: '', date: '', exercise: '', result: '' })

  
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Navbar navigation={navigation} showButtons={true} addButtonToggle={true}/>
      {isEditMode ? 
        <WorkoutEditor workoutItem={workoutItem} setWorkoutItem={setWorkoutItem} setIsEditMode={setIsEditMode} isEditMode={isEditMode} setWorkoutList={setWorkoutList}/>
        :
        <WorkoutList workoutList={workoutList} setWorkoutList={setWorkoutList} setIsEditMode={setIsEditMode} setWorkoutItem={setWorkoutItem}/>
      }
    </View>
  )
}

export default WorkoutListScreen;