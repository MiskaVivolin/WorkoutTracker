import { StyleSheet, Text, TextInput, View, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FormContainerProps } from '../types/Types';
import usePrValidation from '../hooks/usePrValidation';

const FormContainer = ({ prObject, setPrObject, prObjectIsValid, setPrObjectIsValid, setPrList, username }: FormContainerProps): React.JSX.Element => {

  const [validationInit, setValidationInit] = useState(false)
  const [pressedAdd, setPressedAdd] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false)

  useEffect(() => {
    if(validationInit) {
        usePrValidation(prObject, setPrObjectIsValid, setPrList, setPrObject, pressedAdd, setPressedAdd, isEditMode, setIsEditMode, username)
        setValidationInit(false)
    }
  }, [prObject, pressedAdd])

  return (
    <View style={{alignItems: 'center'}}>
      <Text style={{fontSize: 24, marginTop: 150}}>Add a new personal record</Text>
      <View style={styles.inputContainer}>
        <Text style={{fontSize: 16}}>Name</Text>
        <TextInput style={styles.input}
          onChangeText={name => {
              setPrObject({ ...prObject, name })
              
          }}
          value={prObject.name}
          />
          {!prObjectIsValid['name'] && <Text style={styles.errorText}>Name must not be empty</Text>}
      </View>
      <View style={styles.inputContainer}>
        <Text style={{fontSize: 16}}>Date</Text>
        <TextInput style={styles.input}
          onChangeText={date => {
              setPrObject({ ...prObject, date })
              
          }}
          value={prObject.date}
          />
          {!prObjectIsValid['date'] && <Text style={styles.errorText}>Date must not be empty</Text>}
      </View>
      <View style={styles.inputContainer}>
        <Text style={{fontSize: 16}}>Lift</Text>
        <TextInput style={styles.input}
          onChangeText={lift => {
              setPrObject({ ...prObject, lift })
              
          }}
          value={prObject.lift}
          />
          {!prObjectIsValid['lift'] && <Text style={styles.errorText}>Lift must not be empty</Text>}
      </View>
      <View style={styles.inputContainer}>
        <Text style={{fontSize: 16}}>Result</Text>
        <TextInput style={styles.input}
          onChangeText={result => {
            setPrObject({ ...prObject, result })
              
          }}
          value={prObject.result}
          />
          {!prObjectIsValid['result'] && <Text style={styles.errorText}>Result must not be empty</Text>}
      </View>
      <View style={{marginTop: 30, marginBottom: 30}}>
        <Pressable style={styles.button} 
          onPress={() => {
            setValidationInit(true)
            setPressedAdd(true)
            }}>
          <Text style={{fontSize: 16}}>add</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default FormContainer

const styles = StyleSheet.create({
    inputContainer: {
      marginTop: 30
    },
    input: {
      width: 250,
      height: 25, 
      borderRadius: 5,
      borderColor: '#606060', 
      borderWidth: 1, 
    },
    errorText: {
      color: 'red'
    },
    button: {
      backgroundColor: '#66a3ff',
      paddingRight: 14, 
      paddingLeft: 14,
      paddingBottom: 3,
      paddingTop: 3,
      borderRadius: 8, 
      borderWidth: 1, 
      borderColor: '#606060'
    }
})