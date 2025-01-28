import React, { useState } from 'react';
import { View } from 'react-native';
import { WorkoutItem, ResultScreenProps } from '../types/Types';
import useEditPr from '../functions/EditResultItem';
import PrList from '../components/PrList';
import Navbar from '../components/Navbar';
import EditItem from '../components/EditItem';

const ResultScreen: React.FC<ResultScreenProps> = ({ navigation }) => {
  
  const [workoutList, setWorkoutList] = useState<WorkoutItem[]>([])
  const [isEditMode, setIsEditMode] = useState(false)
  const [editWorkoutItem, setEditWorkoutItem] = useState<WorkoutItem>({ _id: 0, user: '', name: '', date: '', exercise: '', result: '' })

  
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Navbar navigation={navigation} showButtons={true} addButtonToggle={true}/>
      {isEditMode ? 
        <EditItem editWorkoutItem={editWorkoutItem} setEditWorkoutItem={setEditWorkoutItem} useEditPr={useEditPr} setIsEditMode={setIsEditMode} isEditMode={isEditMode} setWorkoutList={setWorkoutList}/>
        :
        <PrList workoutList={workoutList} setWorkoutList={setWorkoutList} setIsEditMode={setIsEditMode} setEditWorkoutItem={setEditWorkoutItem}/>
      }
    </View>
  )
}

export default ResultScreen;