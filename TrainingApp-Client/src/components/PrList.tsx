import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FlatList } from 'react-native'
import GetList from './api/GetList';
import DeletePr from './api/DeletePr';
import { DataItem } from '../types/Types'


export default function PrList() {

  const [resultList, setResultList] = useState<DataItem[]>([])

  useEffect(() => {
    console.log("useEffect working")
    GetList(setResultList)
  },[])

  return (
    <View style={styles.listcontainer}>
      <FlatList
        data={resultList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }: {item: DataItem}) =>
        <View style={styles.listcontainer}>
            <Text style={{fontSize:20}}>{item.name}   {item.date}   {item.lift}   {item.result}</Text>
            <Text style={{color: '#0000ff'}} onPress={() => DeletePr(item, setResultList)}>delete</Text>
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