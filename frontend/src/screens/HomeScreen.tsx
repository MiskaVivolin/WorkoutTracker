import React, { useState } from 'react';
import { View } from 'react-native';
import { DataItem, User } from 'types/Types';
import PrList from '../components/PrList';
import useEditPr from '../hooks/useEditPr';
import EditItem from '../components/EditItem';
import FormContainer from '../components/FormContainer';
import { useRoute } from '@react-navigation/native';


const HomeScreen: React.FC = () => {
  
  const route = useRoute();
  const { username } = route.params as User;
  const [prList, setPrList] = useState<DataItem[]>([])
  const [prObject, setPrObject] = useState({ _id: 0, user: '', name: '', date: '', lift: '', result: '' })
  const [prObjectIsValid, setPrObjectIsValid] = useState({ name: true, date: true, lift: true, result: true })
  const [isEditMode, setIsEditMode] = useState(false)
  const [editItem, setEditItem] = useState<DataItem>({ _id: 0, user: '', name: '', date: '', lift: '', result: '' })

  // TODO: 
  // tyylittely
  // Typet ja errorit kuntoon
  // Testaa puhelimella (button shadow)
  // logout toiminto. poista default header. Appin nimi/idea esiin jonnekkin
  // kun on kirjautunut, refresh ei lähetä takaisin loginscreenille
  // sen jälkeen mietitään onko valmis vai tuleeko laajennusta esim search, filter, kaaviot, emojit/kuvat, profiilitiedot jne.
  
  return (
    <View style={{flex: 1}}>
      <FormContainer prObject={prObject} setPrObject={setPrObject} prObjectIsValid={prObjectIsValid} setPrObjectIsValid={setPrObjectIsValid} setPrList={setPrList} username={username}/>
      {isEditMode ? 
        <EditItem editItem={editItem} setEditItem={setEditItem} useEditPr={useEditPr} setIsEditMode={setIsEditMode} isEditMode={isEditMode} setPrList={setPrList}/>
        :
        <PrList list={prList} setList={setPrList} setIsEditMode={setIsEditMode} setEditItem={setEditItem}/>
      }
    </View>
  )
}

export default HomeScreen;