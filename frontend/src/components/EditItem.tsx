import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { EditItemProps } from '../types/Types'

const EditItem = ({ editItem, setEditItem, useEditPr, setIsEditMode }: EditItemProps): React.JSX.Element => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.listItem}>
        <View style={{flexDirection: 'row', marginTop: 1, marginBottom: 5}}>
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
        <View style={{ flexDirection: 'row', paddingTop: 3}}>
          <TouchableOpacity
            style={{ flex: 1, marginRight: 100, paddingRight: 8, paddingLeft: 8, paddingBottom: 1, paddingTop: 1, backgroundColor: '#70db70', borderRadius: 8, borderWidth: 1, borderColor: '#606060' }}
            onPress={() => useEditPr(editItem, setIsEditMode)}
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
    }
})