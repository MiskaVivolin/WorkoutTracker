import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Pressable, Dimensions } from 'react-native'
import { FlatList } from 'react-native'
import useGetList from '../hooks/useGetList';
import useDeletePr from '../hooks/useDeletePr';
import { DataItem, PrListProps } from '../types/Types'
import useGetItem from '../hooks/useGetItem';


export default function PrList({ resultList, setResultList, setIsEditMode, setEditItem }: PrListProps): React.JSX.Element {

  useGetList(setResultList)

  return (
    <View style={styles.listcontainer}>
      <FlatList
        data={resultList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }: {item: DataItem}) =>
        <View style={styles.listItem}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.label}>{item.name}</Text>
            <Text style={styles.label}>{item.date}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.label}>{item.exercise}</Text>
            <Text style={styles.label}>{item.result}</Text>
          </View>
          <Pressable
            style={styles.button}
            onPress={() => {
              useGetItem(item._id, setEditItem)
              setIsEditMode(true)
              }}>
          <Text style={styles.labelButton}>Edit</Text>
          </Pressable>
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
  label: {
    fontSize: 16,
    fontFamily: 'MerriweatherSans',
    color: '#606060',
    marginVertical: 4,
    marginHorizontal: 20
  },
  labelButton: {
    fontSize: 15, 
    fontFamily: 'MerriweatherSans',
    fontWeight: '500', 
    color: 'white', 
    alignSelf: 'center', 
  },
  listItem: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#A9A9A9',
    paddingTop: 8,
    backgroundColor: '#F8F8F8',
    minWidth: Dimensions.get('window').width < 320 ? 270 : 300,
    maxWidth: Dimensions.get('window').width < 360 ? 270 : 340,
  },
  button: {
    width: 95,
    padding: 7,
    marginTop: 6,
    marginBottom: 10,
    marginHorizontal: 25,
    backgroundColor: '#6aa9a9',
    borderRadius: 10, 
    borderWidth: 1, 
    borderColor: '#678e8e',
    textAlign: 'center',
    fontSize: 16,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)', 
  },
})