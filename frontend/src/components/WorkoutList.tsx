import React from 'react'
import { StyleSheet, Text, View, Pressable, Dimensions } from 'react-native'
import { FlatList } from 'react-native'
import useGetWorkoutList from '../hooks/useGetWorkoutList'
import { WorkoutItem, WorkoutListProps } from '../types/Types'
import GetWorkoutItem from '../functions/GetWorkoutItem'
import { Themes } from "../../assets/styles/Themes"
import Button from './Button'
import { useTheme } from '../context/ThemeContext'


const WorkoutList = ({ workoutList, setWorkoutList, setIsEditMode, setWorkoutItem }: WorkoutListProps) => {

  const { theme } = useTheme();
  
  useGetWorkoutList(setWorkoutList);
  
  return (
  <View style={styles.listContainer}>
      <Text style={styles.header}>Exercise results</Text>
      <FlatList
        data={workoutList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }: {item: WorkoutItem}) =>
          <View style={styles.listItem}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.text}>{item.date}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.text}>{item.exercise}</Text>
            <Text style={styles.text}>{item.result}</Text>
          </View>
          <Button 
          title='Edit'
          onPress={() => {
            GetWorkoutItem(item._id, setWorkoutItem)
            setIsEditMode(true)
          }}
          />
        </View>}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: Themes.dark.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontFamily: 'MerriweatherSans',
    color: Themes.dark.secondary,
    marginVertical: 4,
    marginHorizontal: 20
  },
  header: {
    fontSize: Dimensions.get('window').width < 320 ? 22 : 24, 
    fontFamily: 'MerriweatherSans', 
    color: Themes.dark.secondary,
    marginTop: Dimensions.get('window').height < 1000 ? 30 : 50,
    marginBottom: Dimensions.get('window').height < 1000 ? 30 : 50, 
  },
  listItem: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Themes.dark.buttonText,
    paddingTop: 8,
    backgroundColor: Themes.dark.primary,
    minWidth: Dimensions.get('window').width < 320 ? 270 : 300,
    maxWidth: Dimensions.get('window').width < 360 ? 270 : 340,
  }
});

export default WorkoutList;