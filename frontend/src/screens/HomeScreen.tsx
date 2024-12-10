import React, { useState } from 'react';
import { View } from 'react-native';
import { DataItem, HomeScreenProps, User } from '../types/Types';
import PrList from '../components/PrList';
import useEditPr from '../hooks/useEditPr';
import EditItem from '../components/EditItem';
import FormContainer from '../components/FormContainer';
import { useRoute } from '@react-navigation/native';
import Navbar from '../components/Navbar';


const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  
  const route = useRoute();
  const { username } = route.params as User;
  const [resultList, setResultList] = useState<DataItem[]>([])
  const [prObject, setPrObject] = useState({ _id: 0, user: '', name: '', date: '', exercise: '', result: '' })
  const [prObjectIsValid, setPrObjectIsValid] = useState({ name: true, date: true, exercise: true, result: true })
  const [isEditMode, setIsEditMode] = useState(false)
  const [editItem, setEditItem] = useState<DataItem>({ _id: 0, user: '', name: '', date: '', exercise: '', result: '' })

  // TODO: 
  // funktion typet hookeille ja constien nimitys kuntoon
  // button joka vie toiselle sivulle. tänne siirtyy resultlist
  // sen jälkeen mietitään laajennusta esim. search, filter, kaaviot, emojit/kuvat, profiilitiedot jne.
  // docker, testing
  // dokumentaatio
  
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Navbar navigation={navigation} showButtons={true} addButtonToggle={false}/>
      <View>
        <FormContainer prObject={prObject} setPrObject={setPrObject} prObjectIsValid={prObjectIsValid} setPrObjectIsValid={setPrObjectIsValid} setResultList={setResultList} username={username}/>
      </View>
    </View>
  )
}

export default HomeScreen;