import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { DataItem, AddExerciseScreenProps, User } from '../types/Types';
import PrList from '../components/PrList';
import useEditPr from '../hooks/useEditPr';
import EditItem from '../components/EditItem';
import FormContainer from '../components/FormContainer';
import { useRoute } from '@react-navigation/native';
import NavBar from '../components/Navbar';
import { useUserToken } from '../context/UserTokenContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


const AddExerciseScreen: React.FC<AddExerciseScreenProps> = ({ navigation }) => {
  
  const [resultList, setResultList] = useState<DataItem[]>([])
  const [prObject, setPrObject] = useState({ _id: 0, user: '', name: '', date: '', exercise: '', result: '' })
  const [prObjectIsValid, setPrObjectIsValid] = useState({ name: true, date: true, exercise: true, result: true })
  

  // TODO: 
  // funktion typet hookeille ja constien nimitys kuntoon
  // button joka vie toiselle sivulle. tänne siirtyy resultlist
  // sen jälkeen mietitään laajennusta esim. search, filter, kaaviot, emojit/kuvat, profiilitiedot jne.
  // docker, testing
  // dokumentaatio
  
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
        <View>
        <NavBar navigation={navigation} showButtons={true} addButtonToggle={false}/>
        <View>
          <FormContainer prObject={prObject} setPrObject={setPrObject} prObjectIsValid={prObjectIsValid} setPrObjectIsValid={setPrObjectIsValid} setResultList={setResultList}/>
        </View>
      </View>
    </View>
  )
}

export default AddExerciseScreen;