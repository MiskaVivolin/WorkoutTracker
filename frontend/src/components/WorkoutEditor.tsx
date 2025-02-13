import React from 'react'
import { StyleSheet, Text, View, TextInput, Pressable, Dimensions, } from 'react-native'
import { useEffect, useState } from 'react'
import WorkoutItemValidation from '../functions/WorkoutItemValidation'
import { WorkoutEditorProps } from '../types/Types'
import DeleteWorkoutItem from '../functions/DeleteWorkoutItem'
import { useUserToken } from '../context/UserTokenContext'
import Button from './Button'
import { Themes } from '../../assets/styles/Themes'
import { useTheme } from '../context/ThemeContext'

const WorkoutEditor = ({ workoutItem, setWorkoutItem, setIsEditMode, isEditMode, setWorkoutList }: WorkoutEditorProps) => {

  const [validationInit, setValidationInit] = useState(false)
  const [pressedAdd, setPressedAdd] = useState(false);
  const { userToken } = useUserToken();
  const { theme } = useTheme();
  const [workoutItemFieldIsValid, setWorkoutItemFieldIsValid] = useState({
    name: false,
    date: false,
    exercise: false,
    result: false,
  })

  useEffect(() => {
    if(validationInit) {
      WorkoutItemValidation({workoutItem, setWorkoutItem, setWorkoutItemFieldIsValid, setWorkoutList, pressedAdd, setPressedAdd, isEditMode, setIsEditMode, userToken})
    }
  }, [workoutItem, pressedAdd])

  return (
    <View style={[styles.container, {backgroundColor: Themes[theme].background}]}>
      <View style={[styles.listItem, {backgroundColor: Themes[theme].primary}]}>
        <Text style={[styles.header, {color: Themes[theme].defaultText}]}>Edit your workout</Text>
        <View style={{flexDirection: 'row', marginTop: 1, marginBottom: 5}}>
          <View style={{flexDirection: 'column'}}>
            <Text style={[styles.label, {color: Themes[theme].defaultText}]}>Name</Text>
            <TextInput style={[styles.inputField, {color: Themes[theme].defaultText, backgroundColor: Themes[theme].inputField, borderColor: Themes[theme].border}]}
              onChangeText={name => setWorkoutItem({ ...workoutItem, name })}
              value={workoutItem.name}
              />
            {!workoutItemFieldIsValid['name'] && validationInit &&
            <Text style={[styles.inputFieldError, {color: Themes[theme].errorText}]}>Name must not be empty</Text>}
          </View>
          <View style={{flexDirection: 'column'}}>
            <Text style={[styles.label, {color: Themes[theme].defaultText}]}>Date</Text>
            <TextInput style={[styles.inputField, {color: Themes[theme].defaultText, backgroundColor: Themes[theme].inputField, borderColor: Themes[theme].border}]}
              onChangeText={date => setWorkoutItem({ ...workoutItem, date })}
              value={workoutItem.date}
              />
            {!workoutItemFieldIsValid['date'] && validationInit &&
            <Text style={[styles.inputFieldError, {color: Themes[theme].errorText}]}>Date must not be empty</Text>}
          </View>
        </View>
        
        <View style={{flexDirection: 'row', marginTop: 1, marginBottom: 5}}>
          <View style={{flexDirection: 'column'}}>
            <Text style={[styles.label, {color: Themes[theme].defaultText}]}>Exercise</Text>
            <TextInput style={[styles.inputField, {color: Themes[theme].defaultText, backgroundColor: Themes[theme].inputField, borderColor: Themes[theme].border}]}
              onChangeText={exercise => setWorkoutItem({ ...workoutItem, exercise })}
              value={workoutItem.exercise}
              />
            {!workoutItemFieldIsValid['exercise'] && validationInit &&
            <Text style={[styles.inputFieldError, {color: Themes[theme].errorText}]}>Exercise must not be empty</Text>}
          </View>
          <View style={{flexDirection: 'column'}}>
            <Text style={[styles.label, {color: Themes[theme].defaultText}]}>Result</Text>
            <TextInput style={[styles.inputField, {color: Themes[theme].defaultText, backgroundColor: Themes[theme].inputField, borderColor: Themes[theme].border}]}
              onChangeText={result => setWorkoutItem({ ...workoutItem, result })}
              value={workoutItem.result}
              />
            {!workoutItemFieldIsValid['result'] && validationInit &&
            <Text style={[styles.inputFieldError, {color: Themes[theme].errorText}]}>Result must not be empty</Text>}  
            </View>
          </View>
        <View style={styles.buttonContainer}>
          <Button
              title='Save'
              onPress={() => {
              setValidationInit(true)
              setPressedAdd(true)
              }}/>
          <Button
            title='Delete'
            style={{backgroundColor: Themes[theme].deleteButton}}
            onPress={() => {
              setIsEditMode(false)
              DeleteWorkoutItem(workoutItem, setWorkoutList)
              }}/>
          <Button 
            title='Cancel'
            onPress={() => setIsEditMode(false)}
            />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputField: {
    fontSize: 12,
    fontFamily: 'MerriweatherSans',
    marginHorizontal: 10,
    width: Dimensions.get('window').width < 420 ? 130 : 180,
    height: 30, 
    borderWidth: 1, 
    borderRadius: 3,
    paddingHorizontal: 8,
  },
  listItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width < 420 ? 300 : 400,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 8,
    padding: 6,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)', 
  },
  label: {
    fontSize: 13,
    fontFamily: 'MerriweatherSans',
    marginBottom: 2,
    marginHorizontal: 10,
    marginTop: 5
  },
  header: {
    fontSize: 18, 
    fontFamily: 'MerriweatherSans', 
    marginVertical: 12 
  },
  inputFieldError: {
    fontSize: 13,
    fontFamily: 'MerriweatherSans',
    paddingVertical: 5,
    marginLeft: 10
  },
  buttonContainer: {
    flexDirection: 'row', 
    paddingTop: 3, 
    width: Dimensions.get('window').width < 420 ? 300 : 400,
    justifyContent: 'space-between',
  }
})

export default WorkoutEditor;