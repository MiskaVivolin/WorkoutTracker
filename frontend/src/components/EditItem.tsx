import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
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
    lift: true,
    result: true
})

  useEffect(() => {
    if(validationInit) {
        usePrValidation(editItem, setEditItemIsValid, setPrList, setEditItem, pressedAdd, setPressedAdd, isEditMode, setIsEditMode)
        setValidationInit(false)
    }
  }, [editItem, pressedAdd])

  return (
    <View style={styles.listcontainer}>
      <View style={styles.listItem}>
        <View style={{flexDirection: 'row', marginTop: 1, marginBottom: 5}}>
          <View style={{flexDirection: 'column'}}>
            <Text style={{fontSize: 14, marginBottom: 3}}>  Name</Text>
            <TextInput style={styles.input}
              onChangeText={name => setEditItem({ ...editItem, name })}
              value={editItem.name}
              />
          </View>
          <View style={{flexDirection: 'column'}}>
            <Text style={{fontSize: 14, marginBottom: 3}}>  Date</Text>
            <TextInput style={styles.input}
              onChangeText={date => setEditItem({ ...editItem, date })}
              value={editItem.date}
              />
          </View>
          <View style={{flexDirection: 'column'}}>
            <Text style={{fontSize: 14, marginBottom: 3}}>  Lift</Text>
            <TextInput style={styles.input}
              onChangeText={lift => setEditItem({ ...editItem, lift })}
              value={editItem.lift}
              />
          </View>
          <View style={{flexDirection: 'column'}}>
            <Text style={{fontSize: 14, marginBottom: 3}}>  Result</Text>
            <TextInput style={styles.input}
              onChangeText={result => setEditItem({ ...editItem, result })}
              value={editItem.result}
              />
          </View>
        </View>
        <View style={{flexDirection: 'row',}}>
          {!editItemIsValid['name'] && <Text style={styles.errorText}>Name must not be empty</Text>}
          {!editItemIsValid['date'] && <Text style={styles.errorText}>Date must not be empty</Text>}
          {!editItemIsValid['lift'] && <Text style={styles.errorText}>Lift must not be empty</Text>}
          {!editItemIsValid['result'] && <Text style={styles.errorText}>Result must not be empty</Text>}
        </View>
        <View style={{ flexDirection: 'row', paddingTop: 3}}>
          <TouchableOpacity
            style={{ flex: 1, marginRight: 100, paddingRight: 8, paddingLeft: 8, paddingBottom: 1, paddingTop: 1, backgroundColor: '#70db70', borderRadius: 8, borderWidth: 1, borderColor: '#606060' }}
            onPress={() => {
              setValidationInit(true)
              setPressedAdd(true)
              }}
            >
            <Text style={{fontSize: 16}}>  save   </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1, paddingRight: 8, paddingLeft: 8, paddingBottom: 1, paddingTop: 1, backgroundColor: '#ff6666', borderRadius: 8, borderWidth: 1, borderColor: '#606060' }}
            onPress={() => setIsEditMode(false)}
            >
            <Text style={{fontSize: 16}}>cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default EditItem

const styles = StyleSheet.create({
    input: {
      fontSize: 16,
      marginRight: 6,
      marginLeft: 6,
      width: 80, 
      borderColor:'#606060', 
      borderWidth: 1, 
      borderRadius: 5
    },
    listcontainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    listItem: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 5,
      marginBottom: 5,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: '#808080',
      padding: 6,
      backgroundColor: '#F0F0F0',
    },
    errorText: {
      color: 'red',
      paddingBottom: 5,
      paddingRight: 15
    }
})