import React, { useState } from 'react';
import { View } from 'react-native';
import { DataItem, HomeScreenProps, User } from '../types/Types';
import PrList from '../components/PrList';
import Navbar from '../components/Navbar';


const ResultScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  
  const [resultList, setResultList] = useState<DataItem[]>([])
  const [isEditMode, setIsEditMode] = useState(false)
  const [editItem, setEditItem] = useState<DataItem>({ _id: 0, user: '', name: '', date: '', exercise: '', result: '' })

  
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Navbar navigation={navigation} showButton={true}/>
      <PrList resultList={resultList} setResultList={setResultList} setIsEditMode={setIsEditMode} setEditItem={setEditItem}/>
    </View>
  )
}

export default ResultScreen;