import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput } from 'react-native'
import { FlatList } from 'react-native'
import useGetList from '../hooks/useGetList';
import useDeletePr from '../hooks/useDeletePr';
import { DataItem, PrListProps } from '../types/Types'
import useGetItem from '../hooks/useGetItem';
import useEditPr from 'hooks/useEditPr';


export default function PrList({ list, setList, setIsEditMode, setEditItem }: PrListProps): React.JSX.Element {


  useEffect(() => {
    useGetList(setList)
  }, [])

  return (
    <View style={styles.listcontainer}>
      
      <FlatList
        data={list}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }: {item: DataItem}) =>
        <View style={styles.listItem}>
            <Text style={{fontSize:20}}>{item.name}   {item.date}   {item.lift}   {item.result}</Text>
            <View style={{ flexDirection: 'row', paddingTop: 3}}>
            <TouchableOpacity
          style={{ flex: 1, marginRight: 100, paddingRight: 7, paddingLeft: 7, backgroundColor: '#70db70', borderRadius: 8, borderWidth: 1, borderColor: '#606060' }}
          onPress={() => {
            useGetItem(item._id, setEditItem)
            setIsEditMode(true) 
            console.log("PRESSED")
          }}
        >
          <Text>  edit   </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flex: 1, paddingRight: 7, paddingLeft: 7, backgroundColor: '#ff6666', borderRadius: 8, borderWidth: 1, borderColor: '#606060' }}
          onPress={() => useDeletePr(item, setList)
          }
        >
          <Text>delete</Text>
        </TouchableOpacity>
      </View>
        </View>}
      />
      
    
    </View>
  )
}


const styles = StyleSheet.create({
  listcontainer: {
    flex: 1,
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
    padding: 5,
    backgroundColor: '#F0F0F0',
  }
})