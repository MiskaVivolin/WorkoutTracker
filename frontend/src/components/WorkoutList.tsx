import React from 'react'
import { StyleSheet, Text, View, Pressable, Dimensions } from 'react-native'
import { FlatList } from 'react-native'
import useGetWorkoutList from '../hooks/useGetWorkoutList'
import { WorkoutItem, WorkoutListProps } from '../types/Types'
import GetWorkoutItem from '../functions/GetWorkoutItem'


const WorkoutList = ({ workoutList, setWorkoutList, setIsEditMode, setWorkoutItem }: WorkoutListProps) => {

  useGetWorkoutList(setWorkoutList);

  return (
    <View style={styles.listcontainer}>
      <Text style={styles.labelHeader}>Exercise results</Text>
      <FlatList
        data={workoutList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }: {item: WorkoutItem}) =>
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
              GetWorkoutItem(item._id, setWorkoutItem)
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
  labelHeader: {
    fontSize: Dimensions.get('window').width < 320 ? 22 : 24, 
    fontFamily: 'MerriweatherSans', 
    color: '#505050',
    marginTop: Dimensions.get('window').height < 1000 ? 30 : 50,
    marginBottom: Dimensions.get('window').height < 1000 ? 30 : 50, 
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
});

export default WorkoutList;