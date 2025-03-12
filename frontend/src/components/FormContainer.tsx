import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View, Dimensions } from 'react-native'
import { Themes } from '../../assets/styles/Themes';
import { FormContainerProps } from '../types/Types';
import workoutItemValidation from '../functions/workoutItemValidation';
import { useUserToken } from '../context/UserTokenContext';
import { useTheme } from '../context/ThemeContext';
import PopUp from './PopUp';
import Button from './Button';
import ThemeSwitcher from './ThemeSwitcher';

const FormContainer = ({ workoutItem, setWorkoutItem, workoutItemFieldIsValid, setWorkoutItemFieldIsValid, setWorkoutList }: FormContainerProps) => {

  const [validationInit, setValidationInit] = useState(false);
  const [pressedAdd, setPressedAdd] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [confirmFalseValidation, setConfirmFalseValidation] = useState(false);
  const { userToken } = useUserToken();
  const { theme } = useTheme();

  useEffect(() => {
    if(validationInit) {
      workoutItemValidation({workoutItem, setWorkoutItem, setWorkoutItemFieldIsValid, setWorkoutList, pressedAdd, setPressedAdd, isEditMode, setIsEditMode, setValidationInit, setConfirmFalseValidation, userToken})
    }
  }, [workoutItem, pressedAdd])

  return (
    <View style={{alignItems: 'center', backgroundColor: Themes[theme].background}}>
      <ThemeSwitcher />
      <Text style={[styles.header, {color: Themes[theme].defaultText}]}>Add a new exercise result</Text>
      <View style={styles.fieldContainer}>
        <Text style={[styles.label, {color: Themes[theme].defaultText}]}>Name</Text>
        <TextInput style={[styles.inputField, {color: Themes[theme].defaultText, borderColor: Themes[theme].border, backgroundColor: Themes[theme].inputField}]}
          onChangeText={name => {setWorkoutItem({ ...workoutItem, name })}}
          value={workoutItem.name}
          />
        {!workoutItemFieldIsValid['name'] && validationInit && confirmFalseValidation &&
        <Text style={[styles.inputFieldError, {color: Themes[theme].errorText}]}>Name must not be empty</Text>}
      
        <Text style={[styles.label, {color: Themes[theme].defaultText}]}>Date</Text>
        <TextInput style={[styles.inputField, {color: Themes[theme].defaultText, borderColor: Themes[theme].border, backgroundColor: Themes[theme].inputField}]}
          onChangeText={date => {setWorkoutItem({ ...workoutItem, date })}}
          value={workoutItem.date}
          />
        {!workoutItemFieldIsValid['date'] && validationInit && confirmFalseValidation &&
        <Text style={[styles.inputFieldError, {color: Themes[theme].errorText}]}>Date must not be empty</Text>}
        
        <Text style={[styles.label, {color: Themes[theme].defaultText}]}>Exercise</Text>
        <TextInput style={[styles.inputField, {color: Themes[theme].defaultText, borderColor: Themes[theme].border, backgroundColor: Themes[theme].inputField}]}
          onChangeText={exercise => {setWorkoutItem({ ...workoutItem, exercise })}}
          value={workoutItem.exercise}
          />
        {!workoutItemFieldIsValid['exercise'] && validationInit && confirmFalseValidation &&
        <Text style={[styles.inputFieldError, {color: Themes[theme].errorText}]}>Exercise must not be empty</Text>}
      
        <Text style={[styles.label, {color: Themes[theme].defaultText}]}>Result</Text>
        <TextInput style={[styles.inputField, {color: Themes[theme].defaultText, borderColor: Themes[theme].border, backgroundColor: Themes[theme].inputField}]}
          onChangeText={result => {setWorkoutItem({ ...workoutItem, result })}}
          value={workoutItem.result}
          />
        {!workoutItemFieldIsValid['result'] && validationInit && confirmFalseValidation &&
        <Text style={[styles.inputFieldError, {color: Themes[theme].errorText}]}>Result must not be empty</Text>}
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

  fieldContainer: {
    justifyContent: 'center',
    maxWidth: Dimensions.get('window').width < 370 ? 270 : 350,
  },
  label: {
    fontSize: 13,
    fontFamily: 'MerriweatherSans',
    marginBottom: 2,
    marginTop: 12
  },
  header: {
    fontSize: Dimensions.get('window').width < 320 ? 22 : 24, 
    fontFamily: 'MerriweatherSans', 
    marginTop: Dimensions.get('window').height < 1000 ? 75 : 150,
    marginBottom: Dimensions.get('window').height < 1000 ? 30 : 50, 
  },
  inputFieldError: {
    fontSize: 13,
    fontFamily: 'MerriweatherSans', 
  },
  inputField: {
    fontFamily: 'MerriweatherSans',
    fontSize: 12,
    height: 35,
    width: Dimensions.get('window').width < 370 ? 270 : 350,
    borderWidth: 1,
    borderRadius: 3,
    marginBottom: 12,
    paddingHorizontal: 8
  },
});

export default FormContainer;