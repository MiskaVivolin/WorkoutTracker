import { StyleSheet, Text, View, TextInput, Pressable, Dimensions, } from 'react-native'
import { useEffect, useState } from 'react'
import usePrValidation from '../hooks/usePrValidation'
import React from 'react'
import { EditItemProps } from '../types/Types'
import useDeletePr from '../hooks/useDeletePr'

const EditItem = ({ editItem, setEditItem, setIsEditMode, isEditMode, setResultList }: EditItemProps): React.JSX.Element => {

  const [validationInit, setValidationInit] = useState(false)
  const [pressedAdd, setPressedAdd] = useState(false);
  const [editItemIsValid, setEditItemIsValid] = useState({
    name: true,
    date: true,
    exercise: true,
    result: true,
})

  useEffect(() => {
    if(validationInit) {
        usePrValidation(editItem, setEditItemIsValid, setResultList, setEditItem, pressedAdd, setPressedAdd, isEditMode, setIsEditMode, null)
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
              useDeletePr(editItem, setResultList)
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
              useDeletePr(editItem, setResultList)
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
    paddingRight: 15,
    marginHorizontal: 20
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
});

export default EditItem;