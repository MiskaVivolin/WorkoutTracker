import { StyleSheet, Text, TextInput, View, Pressable, Platform } from 'react-native'
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
    <View style={{alignItems: 'center', backgroundColor: 'white'}}>
      <Text style={styles.labelHeader}>Add a new exercise result</Text>
      
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input}
          onChangeText={name => {
              setPrObject({ ...prObject, name })
              
          }}
          value={prObject.name}
          />
          {!prObjectIsValid['name'] && <Text style={styles.labelError}>Name must not be empty</Text>}
      
      
        <Text style={styles.label}>Date</Text>
        <TextInput style={styles.input}
          onChangeText={date => {
              setPrObject({ ...prObject, date })
              
          }}
          value={prObject.date}
          />
          {!prObjectIsValid['date'] && <Text style={styles.labelError}>Date must not be empty</Text>}
      
      
        <Text style={styles.label}>Exercise</Text>
        <TextInput style={styles.input}
          onChangeText={exercise => {
              setPrObject({ ...prObject, exercise })
              
          }}
          value={prObject.exercise}
          />
          {!prObjectIsValid['exercise'] && <Text style={styles.labelError}>Exercise must not be empty</Text>}
      
      
        <Text style={styles.label}>Result</Text>
        <TextInput style={styles.input}
          onChangeText={result => {
            setPrObject({ ...prObject, result })
              
          }}
          value={prObject.result}
          />
          {!prObjectIsValid['result'] && <Text style={styles.labelError}>Result must not be empty</Text>}
      
      <View style={{marginTop: 30, marginBottom: 30}}>
        <Pressable style={styles.button} 
          onPress={() => {
            setValidationInit(true)
            setPressedAdd(true)
            }}>
          <Text style={styles.labelButton}>add</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default FormContainer

const styles = StyleSheet.create({
    label: {
      fontSize: 13,
      fontFamily: 'MerriweatherSans',
      color: '#606060',
      marginBottom: 2,
      paddingRight: 280,
      marginTop: 10
    },
    labelHeader: {
      fontSize: 24, 
      fontFamily: 'MerriweatherSans', 
      color: '#505050',
      marginTop: 150,
      marginBottom: 50, 
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
      width: 350,
      borderColor: '#A9A9A9',
      borderWidth: 1,
      marginBottom: 15,
      paddingHorizontal: 8,
      borderRadius: 3
    },
    errorText: {
      color: 'red'
    },
    button: {
      alignSelf: 'center',
      width: 95,
      padding: 7,
      marginTop: 70,
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
    },
})