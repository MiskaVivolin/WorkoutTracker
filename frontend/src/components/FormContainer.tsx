import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View, Dimensions, Pressable } from 'react-native'
import { FormContainerProps } from '../types/Types';
import WorkoutItemValidation from '../functions/WorkoutItemValidation';
import { useUserToken } from '../context/UserTokenContext';
import PopUp from './PopUp';
import Button from './Button';

const FormContainer = ({ workoutItem, setWorkoutItem, workoutItemFieldIsValid, setWorkoutItemFieldIsValid, setWorkoutList }: FormContainerProps) => {

  const [validationInit, setValidationInit] = useState(false);
  const [pressedAdd, setPressedAdd] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [confirmFalseValidation, setConfirmFalseValidation] = useState(false);
  const { userToken } = useUserToken();

  useEffect(() => {
    if(validationInit) {
      WorkoutItemValidation({workoutItem, setWorkoutItem, setWorkoutItemFieldIsValid, setWorkoutList, pressedAdd, setPressedAdd, isEditMode, setIsEditMode, setValidationInit, setConfirmFalseValidation, userToken})
    }
  }, [workoutItem, pressedAdd])

  return (
    <View style={styles.container}>
      <Text style={styles.labelHeader}>Add a new exercise result</Text>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input}
          onChangeText={name => {setWorkoutItem({ ...workoutItem, name })}}
          value={workoutItem.name}
          />
        {!workoutItemFieldIsValid['name'] && validationInit && confirmFalseValidation &&
        <Text style={styles.labelError}>Name must not be empty</Text>}
      
        <Text style={styles.label}>Date</Text>
        <TextInput style={styles.input}
          onChangeText={date => {setWorkoutItem({ ...workoutItem, date })}}
          value={workoutItem.date}
          />
        {!workoutItemFieldIsValid['date'] && validationInit && confirmFalseValidation &&
        <Text style={styles.labelError}>Date must not be empty</Text>}
        
        <Text style={styles.label}>Exercise</Text>
        <TextInput style={styles.input}
          onChangeText={exercise => {setWorkoutItem({ ...workoutItem, exercise })}}
          value={workoutItem.exercise}
          />
        {!workoutItemFieldIsValid['exercise'] && validationInit && confirmFalseValidation &&
        <Text style={styles.labelError}>Exercise must not be empty</Text>}
      
        <Text style={styles.label}>Result</Text>
        <TextInput style={styles.input}
          onChangeText={result => {setWorkoutItem({ ...workoutItem, result })}}
          value={workoutItem.result}
          />
        {!workoutItemFieldIsValid['result'] && validationInit && confirmFalseValidation &&
        <Text style={styles.labelError}>Result must not be empty</Text>}
      </View>
      <View style={{marginTop: 30, marginBottom: 30}}>
        <Button 
          title='Add'
          onPress={() => {
            setValidationInit(true)
            setPressedAdd(true)
          }}/>
        {workoutItemFieldIsValid['name'] && workoutItemFieldIsValid['date'] && workoutItemFieldIsValid['exercise'] && workoutItemFieldIsValid['result'] && pressedAdd &&
        <PopUp setValidationInit={setValidationInit} setPressedAdd={setPressedAdd} workoutItemFieldIsValid={workoutItemFieldIsValid} setWorkoutItemFieldIsValid={setWorkoutItemFieldIsValid}/>
        }
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', 
    backgroundColor: 'white'
  },
  fieldContainer: {
    justifyContent: 'center',
    maxWidth: Dimensions.get('window').width < 370 ? 270 : 350,
  },
  label: {
    fontSize: 13,
    fontFamily: 'MerriweatherSans',
    color: '#606060',
    marginBottom: 2,
    marginTop: 12
  },
  labelHeader: {
    fontSize: Dimensions.get('window').width < 320 ? 22 : 24, 
    fontFamily: 'MerriweatherSans', 
    color: '#505050',
    marginTop: Dimensions.get('window').height < 1000 ? 75 : 150,
    marginBottom: Dimensions.get('window').height < 1000 ? 30 : 50, 
  },
  labelError: {
    fontSize: 13,
    fontFamily: 'MerriweatherSans', 
    color: 'red',
  },
  labelButton: {
    fontSize: 15, 
    fontFamily: 'MerriweatherSans',
    fontWeight: '500', 
    color: 'white', 
    alignSelf: 'center', 
  },
  input: {
    fontFamily: 'MerriweatherSans',
    fontSize: 12,
    color: '#606060',
    height: 35,
    backgroundColor: '#F8F8F8',
    width: Dimensions.get('window').width < 370 ? 270 : 350,
    borderColor: '#A9A9A9',
    borderWidth: 1,
    borderRadius: 3,
    marginBottom: 12,
    paddingHorizontal: 8
  },
  errorText: {
    color: 'red'
  },
  button: {
    alignSelf: 'center',
    width: 95,
    padding: 7,
    marginTop: Dimensions.get('window').height < 1000 ? 30 : 70,
    backgroundColor: '#6aa9a9',
    borderRadius: 10, 
    borderWidth: 1, 
    borderColor: '#678e8e',
    textAlign: 'center',
    fontSize: 16,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
  },
});

export default FormContainer;