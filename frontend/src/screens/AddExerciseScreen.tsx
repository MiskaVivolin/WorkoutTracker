import React, { useState } from 'react';
import { View } from 'react-native';
import { DataItem, AddExerciseScreenProps, } from '../types/Types';
import FormContainer from '../components/FormContainer';
import Navbar from '../components/Navbar';


const AddExerciseScreen: React.FC<AddExerciseScreenProps> = ({ navigation }) => {
  
  const [resultList, setResultList] = useState<DataItem[]>([])
  const [prObject, setPrObject] = useState({ _id: 0, user: '', name: '', date: '', exercise: '', result: '' })
  const [prObjectIsValid, setPrObjectIsValid] = useState({ name: true, date: true, exercise: true, result: true })
  

  // TODO: 
  // dokumentaatio, päivitä kuvat
  // Results/Add nappi paremmaksi
  // PopUp paremmaksi
  // korjaa bugi: kun editoi tulosta, jos joku kenttä jää tyhjäksi ja validaatio valittaa, se työntää textinputit formcontainerin yli.
  // korjaa bugi: consoli printtaa kaksi kertaa POST errorin
  // tarkista voiko propseja vähentää
  // kun vaihtaa sivua, validaation pitäisi restartata (ei enää valita tyhjistä fieldeistä)
  // muuta prObjectien nimet (ja muiden mahdollisesti)
  // funktion typet hookeille ja constien nimitys kuntoon, tarkista statet
  // sen jälkeen mietitään laajennusta esim. search, filter, kaaviot, emojit/kuvat, profiilitiedot jne.
  // docker, testing
  
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
        <View>
        <Navbar navigation={navigation} showButtons={true} addButtonToggle={false}/>
        <View>
          <FormContainer prObject={prObject} setPrObject={setPrObject} prObjectIsValid={prObjectIsValid} setPrObjectIsValid={setPrObjectIsValid} setResultList={setResultList}/>
        </View>
      </View>
    </View>
  )
}

export default AddExerciseScreen;