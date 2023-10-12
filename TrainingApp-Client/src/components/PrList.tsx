import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FlatList } from 'react-native'
import useGetList from '../hooks/useGetList';
import useDeletePr from '../hooks/useDeletePr';
import { DataItem, SetResultList } from '../types/Types'


export default function PrList(props: { list: DataItem[]; setList: SetResultList; }): React.JSX.Element {

  const { list, setList } = props;

  useEffect(() => {
    console.log("useEffect working")
    useGetList(setList)
  },[])

  return (
    <View style={styles.listcontainer}>
      <FlatList
        data={list}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }: {item: DataItem}) =>
        <View style={styles.listcontainer}>
            <Text style={{fontSize:20}}>{item.name}   {item.date}   {item.lift}   {item.result}</Text>
            <Text style={{color: '#0000ff'}} onPress={() => useDeletePr(item, setList)}>delete</Text>
        </View>}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  listcontainer: {
      flex: 1,
      backgroundColor: 'skyblue',
      alignItems: 'center',
      justifyContent: 'center',
  },
})