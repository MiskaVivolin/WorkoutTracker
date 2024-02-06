import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Pressable, Platform } from 'react-native'
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
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.label}>{item.name}</Text>
            <Text style={styles.label}>{item.date}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.label}>{item.exercise}</Text>
            <Text style={styles.label}>{item.result}</Text>
          </View>
            <View style={{ flexDirection: 'row', paddingTop: 5}}>
            <Pressable
              style={styles.button}
              onPress={() => {
                useGetItem(item._id, setEditItem)
                setIsEditMode(true)
                }}>
            <Text style={styles.labelButton}>edit</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => useDeletePr(item, setList)}>
            <Text style={styles.labelButton}>delete</Text>
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
  label: {
    fontSize: 16,
    fontFamily: 'MerriweatherSans',
    color: '#606060',
    marginVertical: 3,
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
    minWidth: 300
  },
  button: {
    width: 95,
    padding: 7,
    margin: 10,
    marginHorizontal: 25,
    backgroundColor: '#6aa9a9',
    borderRadius: 10, 
    borderWidth: 1, 
    borderColor: '#678e8e',
    textAlign: 'center',
    fontSize: 16,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)', 
    ...Platform.select({
      ios: {
        shadowColor: '#696969',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
        shadowColor: '#696969',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
      }
    })
  }
})