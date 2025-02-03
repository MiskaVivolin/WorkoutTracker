import React from 'react'
import { StyleSheet, Text, View, TextInput, Pressable, Dimensions, } from 'react-native'
import { useEffect, useState } from 'react'
import WorkoutItemValidation from '../functions/WorkoutItemValidation'
import { WorkoutEditorProps } from '../types/Types'
import DeleteWorkoutItem from '../functions/DeleteWorkoutItem'
import { useUserToken } from '../context/UserTokenContext'

const WorkoutEditor = ({ workoutItem, setWorkoutItem, setIsEditMode, isEditMode, setWorkoutList }: WorkoutEditorProps) => {

  const [validationInit, setValidationInit] = useState(false)
  const [pressedAdd, setPressedAdd] = useState(false);
  const { userToken } = useUserToken();
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
    <View style={styles.listcontainer}>
      <View style={styles.listItem}>
        <Text style={styles.labelHeader}>Edit your workout</Text>
        <View style={{flexDirection: 'row', marginTop: 1, marginBottom: 5}}>
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.label}>Name</Text>
            <TextInput style={styles.input}
              onChangeText={name => setWorkoutItem({ ...workoutItem, name })}
              value={workoutItem.name}
              />
            {!workoutItemFieldIsValid['name'] && validationInit &&
            <Text style={styles.labelError}>Name must not be empty</Text>}
          </View>
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.label}>Date</Text>
            <TextInput style={styles.input}
              onChangeText={date => setWorkoutItem({ ...workoutItem, date })}
              value={workoutItem.date}
              />
            {!workoutItemFieldIsValid['date'] && validationInit &&
            <Text style={styles.labelError}>Date must not be empty</Text>}
          </View>
        </View>
        
        <View style={{flexDirection: 'row', marginTop: 1, marginBottom: 5}}>
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.label}>Exercise</Text>
            <TextInput style={styles.input}
              onChangeText={exercise => setWorkoutItem({ ...workoutItem, exercise })}
              value={workoutItem.exercise}
              />
            {!workoutItemFieldIsValid['exercise'] && validationInit &&
            <Text style={styles.labelError}>Exercise must not be empty</Text>}
          </View>
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.label}>Result</Text>
            <TextInput style={styles.input}
              onChangeText={result => setWorkoutItem({ ...workoutItem, result })}
              value={workoutItem.result}
              />
            {!workoutItemFieldIsValid['result'] && validationInit &&
            <Text style={styles.labelError}>Result must not be empty</Text>}  
            </View>
          </View>
        {Dimensions.get('window').width < 420 
        ?
        <View style={{alignItems: 'center'}}>
          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.button}
              onPress={() => {
                setValidationInit(true)
                setPressedAdd(true)
                }}
              >
              <Text style={styles.labelButton}>Save</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => setIsEditMode(false)}
              >
              <Text style={styles.labelButton}>Cancel</Text>
            </Pressable>
          </View>
          <Pressable
            style={styles.buttonDelete}
            onPress={() => {
              setIsEditMode(false)
              DeleteWorkoutItem(workoutItem, setWorkoutList)
              }}
            >
            <Text style={styles.labelButton}>Delete</Text>
          </Pressable>
        </View>
        :
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            onPress={() => {
              setValidationInit(true)
              setPressedAdd(true)
              }}
            >
            <Text style={styles.labelButton}>Save</Text>
          </Pressable>
          <Pressable
            style={styles.buttonDelete}
            onPress={() => {
              setIsEditMode(false)
              DeleteWorkoutItem(workoutItem, setWorkoutList)
              }}
            >
            <Text style={styles.labelButton}>Delete</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => setIsEditMode(false)}
            >
            <Text style={styles.labelButton}>Cancel</Text>
          </Pressable>
        </View>
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    fontSize: 12,
    fontFamily: 'MerriweatherSans',
    color: '#606060',
    marginHorizontal: 10,
    width: Dimensions.get('window').width < 420 ? 130 : 180,
    height: 30, 
    borderColor: '#A9A9A9',
    borderWidth: 1, 
    borderRadius: 3,
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 8,
  },
  listcontainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width < 420 ? 300 : 400,
    marginTop: 5,
    marginBottom: 5,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#A9A9A9',
    padding: 6,
    backgroundColor: '#F8F8F8',
  },
  label: {
    fontSize: 13,
    fontFamily: 'MerriweatherSans',
    color: '#606060',
    marginBottom: 2,
    marginHorizontal: 10,
    marginTop: 5
  },
  labelHeader: {
    fontSize: 18, 
    fontFamily: 'MerriweatherSans', 
    color: '#606060',
    marginVertical: 12 
  },
  labelButton: {
    fontSize: 15, 
    fontFamily: 'MerriweatherSans',
    fontWeight: '500', 
    color: 'white', 
    alignSelf: 'center', 
  },
  labelError: {
    fontSize: 13,
    fontFamily: 'MerriweatherSans',
    color: 'red',
    paddingVertical: 5,
    marginLeft: 10
  },
  buttonContainer: {
    flexDirection: 'row', 
    paddingTop: 3, 
    width: Dimensions.get('window').width < 420 ? 300 : 400,
    justifyContent: 'space-between',
  },
  button: {
    width: 95,
    padding: 7,
    margin: 12,
    marginHorizontal: 15,
    backgroundColor: '#6aa9a9',
    borderRadius: 10, 
    borderWidth: 1, 
    borderColor: '#678e8e',
    textAlign: 'center',
    fontSize: 16,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
  },
  buttonDelete: {
    width: 95,
    padding: 7,
    marginTop: 12,
    marginBottom: 12,
    marginHorizontal: 25,
    backgroundColor: '#ff4d4d',
    borderRadius: 10, 
    borderWidth: 1, 
    borderColor: '#678e8e',
    textAlign: 'center',
    fontSize: 16,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
  }
})

export default WorkoutEditor;