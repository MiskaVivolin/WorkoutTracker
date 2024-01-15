import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import { FlatList } from 'react-native'
import useGetList from '../hooks/useGetList';
import useDeletePr from '../hooks/useDeletePr';
import { DataItem, PrListProps } from '../types/Types'
import useGetItem from '../hooks/useGetItem';


export default function PrList({ list, setList, setIsEditMode, setEditItem }: PrListProps): React.JSX.Element {

  useGetList(setList)

  return (
    <View style={styles.listcontainer}>
      <FlatList
        data={list}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }: {item: DataItem}) =>
        <View style={styles.listItem}>
            <Text style={{fontSize:20}}>{item.name}    {item.date}    {item.exercise}    {item.result}</Text>
            <View style={{ flexDirection: 'row', paddingTop: 5}}>
            <Pressable
              style={{ flex: 1, marginRight: 100, paddingRight: 8, paddingLeft: 8, paddingBottom: 1, paddingTop: 1, backgroundColor: '#70db70', borderRadius: 8, borderWidth: 1, borderColor: '#606060' }}
              onPress={() => {
                useGetItem(item._id, setEditItem)
                setIsEditMode(true)
                }}>
            <Text style={{fontSize: 16}}>  edit   </Text>
          </Pressable>
          <Pressable
            style={{ flex: 1, paddingRight: 8, paddingLeft: 8, paddingBottom: 1, paddingTop: 1, backgroundColor: '#ff6666', borderRadius: 8, borderWidth: 1, borderColor: '#606060' }}
            onPress={() => useDeletePr(item, setList)}>
            <Text style={{fontSize: 16}}>delete</Text>
          </Pressable>
        </View>
      </View>}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  listcontainer: {
    flex: 1,
    backgroundColor: 'white',
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
  }
})