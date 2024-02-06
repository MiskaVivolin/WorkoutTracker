import { StyleSheet, Text, View, TextInput, Pressable, Platform } from 'react-native'
import { useEffect, useState } from 'react'
import usePrValidation from '../hooks/usePrValidation'
import React from 'react'
import { EditItemProps } from '../types/Types'

const EditItem = ({ editItem, setEditItem, setIsEditMode, isEditMode, setPrList }: EditItemProps): React.JSX.Element => {

  const [validationInit, setValidationInit] = useState(false)
  const [pressedAdd, setPressedAdd] = useState(false);
  const [editItemIsValid, setEditItemIsValid] = useState({
    name: true,
    date: true,
    exercise: true,
    result: true
})

  useEffect(() => {
    if(validationInit) {
        usePrValidation(editItem, setEditItemIsValid, setPrList, setEditItem, pressedAdd, setPressedAdd, isEditMode, setIsEditMode, null)
        setValidationInit(false)
    }
  }, [editItem, pressedAdd])

  return (
    <View style={styles.listcontainer}>
      <View style={styles.listItem}>
        <Text style={styles.labelHeader}>Edit your exercise result</Text>
        <View style={{flexDirection: 'row', marginTop: 1, marginBottom: 5}}>
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.label}>Name</Text>
            <TextInput style={styles.input}
              onChangeText={name => setEditItem({ ...editItem, name })}
              value={editItem.name}
              />
            {!editItemIsValid['name'] && <Text style={styles.labelError}>Name must not be empty</Text>}
          </View>
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.label}>Date</Text>
            <TextInput style={styles.input}
              onChangeText={date => setEditItem({ ...editItem, date })}
              value={editItem.date}
              />
            {!editItemIsValid['date'] && <Text style={styles.labelError}>Date must not be empty</Text>}
          </View>
        </View>
        <View style={{flexDirection: 'row', marginTop: 1, marginBottom: 5}}>
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.label}>Exercise</Text>
            <TextInput style={styles.input}
              onChangeText={exercise => setEditItem({ ...editItem, exercise })}
              value={editItem.exercise}
              />
            {!editItemIsValid['exercise'] && <Text style={styles.labelError}>Exercise must not be empty</Text>}
          </View>
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.label}>Result</Text>
            <TextInput style={styles.input}
              onChangeText={result => setEditItem({ ...editItem, result })}
              value={editItem.result}
              />
            {!editItemIsValid['result'] && <Text style={styles.labelError}>Result must not be empty</Text>}  
            </View>
          </View>
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            onPress={() => {
              setValidationInit(true)
              setPressedAdd(true)
              }}
            >
            <Text style={styles.labelButton}>save</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => setIsEditMode(false)}
            >
            <Text style={styles.labelButton}>cancel</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default EditItem

const styles = StyleSheet.create({
    input: {
      fontSize: 12,
      fontFamily: 'MerriweatherSans',
      color: '#606060',
      marginHorizontal: 20,
      width: 180,
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
      width: 450,
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
      marginHorizontal: 20,
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
      paddingRight: 15,
      marginHorizontal: 20
    },
    buttonContainer: {
      flexDirection: 'row', 
      paddingTop: 3, 
      width: 450, 
      justifyContent: 'space-between'
    },
    button: {
      width: 95,
      padding: 7,
      margin: 12,
      marginHorizontal: 25,
      backgroundColor: '#6aa9a9',
      borderRadius: 10, 
      borderWidth: 1, 
      borderColor: '#678e8e',
      textAlign: 'center',
      fontSize: 16,
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)', 
      ...Platform.select({
        ios: {
          shadowColor: '#696969',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.4,
          shadowRadius: 2,
        },
        android: {
          elevation: 2,
          shadowColor: '#696969',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.4,
          shadowRadius: 2,
        }
      })
    }
})