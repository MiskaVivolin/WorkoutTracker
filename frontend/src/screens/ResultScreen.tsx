import React, { useState } from 'react';
import { View } from 'react-native';
import { DataItem, ResultScreenProps } from '../types/Types';
import useEditPr from '../hooks/useEditPr';
import PrList from '../components/PrList';
import Navbar from '../components/Navbar';
import EditItem from '../components/EditItem';
import { useRoute } from '@react-navigation/native';


const ResultScreen: React.FC<ResultScreenProps> = ({ navigation }) => {
  
  const [resultList, setResultList] = useState<DataItem[]>([])
  const [isEditMode, setIsEditMode] = useState(false)
  const [editItem, setEditItem] = useState<DataItem>({ _id: 0, user: '', name: '', date: '', exercise: '', result: '' })

  
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Navbar navigation={navigation} showButtons={true} addButtonToggle={true}/>
      {isEditMode ? 
        <EditItem editItem={editItem} setEditItem={setEditItem} useEditPr={useEditPr} setIsEditMode={setIsEditMode} isEditMode={isEditMode} setResultList={setResultList}/>
        :
        <PrList resultList={resultList} setResultList={setResultList} setIsEditMode={setIsEditMode} setEditItem={setEditItem}/>
      }
    </View>
  )
}

export default ResultScreen;