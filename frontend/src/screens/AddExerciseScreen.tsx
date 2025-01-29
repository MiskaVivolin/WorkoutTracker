import React, { useState } from 'react';
import { View } from 'react-native';
import { WorkoutItem, AddExerciseScreenProps, } from '../types/Types';
import FormContainer from '../components/FormContainer';
import Navbar from '../components/Navbar';


const AddExerciseScreen: React.FC<AddExerciseScreenProps> = ({ navigation }) => {
  
  const [workoutList, setWorkoutList] = useState<WorkoutItem[]>([])
  const [workoutItem, setWorkoutItem] = useState({ _id: 0, user: '', name: '', date: '', exercise: '', result: '' })
  const [workoutItemIsValid, setWorkoutItemIsValid] = useState({ name: true, date: true, exercise: true, result: true })
  

  // TODO: 
  // dokumentaatio, päivitä kuvat
  // Results/Add nappi paremmaksi
  // PopUp paremmaksi
  // korjaa bugi: kun editoi tulosta, jos joku kenttä jää tyhjäksi ja validaatio valittaa, se työntää textinputit formcontainerin yli.
  // korjaa bugi: consoli printtaa kaksi kertaa POST errorin
  // tarkista voiko propseja vähentää
  // kun vaihtaa sivua, validaation pitäisi restartata (ei enää valita tyhjistä fieldeistä)
  // muuta prObjectien nimet (ja muiden mahdollisesti)
  // jos ei ole itemeitä, näytä teksti ja kuva.
  // mahdollisuus lisätä settien määrä. (numero field jonka default on 1? + ja - napit?)
  // name fieldin default on username
  // any typet kuntoon
  // muuta värejä paremmaksi ja muutenkin yleisilmettä
  // funktion typet hookeille ja constien nimitys kuntoon, tarkista statet
  // sen jälkeen mietitään laajennusta esim. search, filter, kaaviot, emojit/kuvat, profiilitiedot jne.
  // docker, testing
  
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
        <View>
        <Navbar navigation={navigation} showButtons={true} addButtonToggle={false}/>
        <View>
          <FormContainer workoutItem={workoutItem} setWorkoutItem={setWorkoutItem} workoutItemFieldIsValid={workoutItemIsValid} setWorkoutItemFieldIsValid={setWorkoutItemIsValid} setWorkoutList={setWorkoutList}/>
        </View>
      </View>
    </View>
  )
}

export default AddExerciseScreen;