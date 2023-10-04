import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { PrFields } from '../types/Types';

const InputContainer = (props: { header: string; value: string; object: PrFields; setObject: any; objectIsValid: {[key: string]: boolean} }) => {

    const {header, value, object, setObject, objectIsValid} = props;

  return (
    <View style={styles.inputContainer}>
        <Text>{header}</Text>
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
        width: 200, 
        borderColor:'gray', 
        borderWidth: 1, 
    },
    errorText: {
        color: 'red'
    }
})