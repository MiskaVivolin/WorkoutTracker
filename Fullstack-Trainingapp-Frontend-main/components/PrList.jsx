import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native'
import { useEffect } from 'react';
import GetList from './crudcomponents/GetList';
import DeletePr from './crudcomponents/DeletePr';


export default function PrList() {

  const [resultList, setResultList] = React.useState([])

  useEffect(() => {
    console.log("useEffect working")
    GetList(setResultList)
  },[])

  return (
    <View style={styles.listcontainer}>
      <FlatList
        data={resultList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) =>
        <View style={styles.listcontainer}><Text style={{fontSize:20}}>{item.name}   {item.date}   {item.lift}   {item.result}</Text>
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