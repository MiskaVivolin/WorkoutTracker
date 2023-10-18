import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { InputContainerProps, PrFields } from '../types/Types';

const InputContainer = ({ header, value, object, setObject, objectIsValid }: InputContainerProps): React.JSX.Element => {

  return (
    <View style={styles.inputContainer}>
        <Text style={{fontSize: 16}}>{header}</Text>
        <TextInput style={styles.input}
            onChangeText={newName => setObject({ ...object, [value]: newName })}
            value={String(object[value as keyof PrFields])}
            />
            {!objectIsValid[value] && <Text style={styles.errorText}>{header} must not be empty</Text>}
    </View>
  )
}

export default InputContainer

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
    }
})