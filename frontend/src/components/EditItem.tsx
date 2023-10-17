import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { EditItemProps } from '../types/Types'

const EditItem = ({ editItem, setEditItem, useEditPr, setIsEditMode }: EditItemProps): React.JSX.Element => {
  return (
    <View style={styles.listItem}>
        <View style={{flexDirection: 'row'}}>
        <TextInput style={styles.input}
            onChangeText={name => setEditItem({ ...editItem, name })}
            value={editItem.name}
            />
        <TextInput style={styles.input}
            onChangeText={date => setEditItem({ ...editItem, date })}
            value={editItem.date}
            />
        <TextInput style={styles.input}
            onChangeText={lift => setEditItem({ ...editItem, lift })}
            value={editItem.lift}
            />
        <TextInput style={styles.input}
            onChangeText={result => setEditItem({ ...editItem, result })}
            value={editItem.result}
            />
        </View>
      {/* <Text style={{fontSize:20}}>{editItem.name}   {editItem.date}   {editItem.lift}   {editItem.result}</Text> */}
    <View style={{ flexDirection: 'row', paddingTop: 3}}>
      <TouchableOpacity
        style={{ flex: 1, marginRight: 100, paddingRight: 7, paddingLeft: 7, backgroundColor: '#70db70', borderRadius: 8, borderWidth: 1, borderColor: '#606060' }}
        onPress={() => {
            useEditPr(editItem, setEditItem)
            setIsEditMode(false)
        }}
        >
        <Text>  save   </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flex: 1, paddingRight: 7, paddingLeft: 7, backgroundColor: '#ff6666', borderRadius: 8, borderWidth: 1, borderColor: '#606060' }}
        onPress={() => setIsEditMode(false)}
        >
        <Text>cancel</Text>
      </TouchableOpacity>
    </View>
  </View>
  )
}

export default EditItem

const styles = StyleSheet.create({
    input: {
        width: 50, 
        borderColor:'gray', 
        borderWidth: 1, 
    },
    listItem: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        marginBottom: 5,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#808080',
        padding: 5,
        backgroundColor: '#F0F0F0',
      }
})