import React, { useState } from 'react';
import { View } from 'react-native';
import { DataItem, HomeScreenProps, User } from 'types/Types';
import PrList from '../components/PrList';
import useEditPr from '../hooks/useEditPr';
import EditItem from '../components/EditItem';
import FormContainer from '../components/FormContainer';
import { useRoute } from '@react-navigation/native';
import { useUserToken } from '../context/UserTokenContext';
import Navbar from '../components/Navbar';


const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  
  const { userToken } = useUserToken()
  const route = useRoute();
  const { username } = route.params as User;
  const [prList, setPrList] = useState<DataItem[]>([])
  const [prObject, setPrObject] = useState({ _id: 0, user: '', name: '', date: '', exercise: '', result: '' })
  const [prObjectIsValid, setPrObjectIsValid] = useState({ name: true, date: true, exercise: true, result: true })
  const [isEditMode, setIsEditMode] = useState(false)
  const [editItem, setEditItem] = useState<DataItem>({ _id: 0, user: '', name: '', date: '', exercise: '', result: '' })

  // TODO: 
  // responsiivisuus ja puhelimen toimivuus
  // logout toiminto
  // kun on kirjautunut, refresh ei lähetä takaisin loginscreenille
  // sen jälkeen mietitään onko valmis vai tuleeko laajennusta esim search, filter, kaaviot, emojit/kuvat, profiilitiedot jne.
  
  if(!userToken) {
    navigation.navigate('LoginScreen')
  }
  
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Navbar navigation={navigation} showButton={true}/>
      <View>
        <FormContainer prObject={prObject} setPrObject={setPrObject} prObjectIsValid={prObjectIsValid} setPrObjectIsValid={setPrObjectIsValid} setPrList={setPrList} username={username}/>
        {isEditMode ? 
          <EditItem editItem={editItem} setEditItem={setEditItem} useEditPr={useEditPr} setIsEditMode={setIsEditMode} isEditMode={isEditMode} setPrList={setPrList}/>
          :
          <PrList list={prList} setList={setPrList} setIsEditMode={setIsEditMode} setEditItem={setEditItem}/>
        }
      </View>
    </View>
  )
}

export default HomeScreen;