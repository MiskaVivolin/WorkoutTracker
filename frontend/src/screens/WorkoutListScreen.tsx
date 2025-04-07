import React, { useState } from 'react';
import { View } from 'react-native';
import { WorkoutListScreenProps } from '../types/screenProps';
import { WorkoutItem } from '../types/workoutItemTypes';
import WorkoutList from '../components/WorkoutList';
import Navbar from '../components/Navbar';
import WorkoutEditor from '../components/WorkoutEditor';
import { Themes } from '../../assets/styles/Themes'
import { useTheme } from '../context/ThemeContext';

const WorkoutListScreen: React.FC<WorkoutListScreenProps> = ({ navigation }) => {
  
  const [workoutList, setWorkoutList] = useState<WorkoutItem[]>([])
  const [isEditMode, setIsEditMode] = useState(false)
  const [workoutItem, setWorkoutItem] = useState<WorkoutItem>({ id: 0, name: '', date: '', exercise: '', result: '' })
  const { theme } = useTheme();
  
  return (
    <View style={{flex: 1, backgroundColor: Themes[theme].background}}>
      <Navbar navigation={navigation} showButtons={true} addButtonToggle={true}/>
      {isEditMode ? 
        <WorkoutEditor workoutItem={workoutItem} setIsEditMode={setIsEditMode} setWorkoutList={setWorkoutList}/>
        :
        <WorkoutList workoutList={workoutList} setWorkoutList={setWorkoutList} setIsEditMode={setIsEditMode} setWorkoutItem={setWorkoutItem}/>
      }
    </View>
  )
}

export default WorkoutListScreen;