import React from 'react'
import { StyleSheet, Text, View, Pressable, Dimensions, Platform } from 'react-native'
import { FlatList } from 'react-native'
import useGetWorkoutList from '../hooks/useGetWorkoutList'
import { WorkoutListProps } from '../types/componentProps'
import { WorkoutItem } from '../types/workoutItemTypes'
import getWorkoutItem from '../services/getWorkoutItem'
import { Themes } from "../../assets/styles/Themes"
import { useTheme } from '../context/ThemeContext'
import Button from './Button'


const WorkoutList = ({ workoutList, setWorkoutList, setIsEditMode, setWorkoutItem }: WorkoutListProps) => {

  const { theme } = useTheme();
  
  useGetWorkoutList(setWorkoutList);
  
  return (
  <View style={[styles.listContainer, {backgroundColor: Themes[theme].background}]}>
      <Text style={[styles.header, {color: Themes[theme].defaultText}]}>Exercise results</Text>
      <FlatList
        data={workoutList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }: {item: WorkoutItem}) =>
          <View style={[styles.listItem, {backgroundColor: Themes[theme].primary}]}>
          <View style={styles.labelContainer}>
            <Text style={[styles.label, {color: Themes[theme].defaultText}]}>{item.name}</Text>
            <Text style={[styles.label, {color: Themes[theme].defaultText}]}>{item.date}</Text>
          </View>
          <View style={styles.labelContainer}>
            <Text style={[styles.label, {color: Themes[theme].defaultText}]}>{item.exercise}</Text>
            <Text style={[styles.label, {color: Themes[theme].defaultText}]}>{item.result}</Text>
          </View>
          <Button 
          title='Edit'
          onPress={async () => {
            await getWorkoutItem(item.id, setWorkoutItem)
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 15,
    fontFamily: 'MerriweatherSans',
    marginVertical: 4,
  },
  labelContainer: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  header: {
    fontSize:  Platform.OS === 'android' ? 20 : 24, 
    fontFamily: 'MerriweatherSans', 
    marginTop: Platform.OS === 'android' ? 30 : 50,
    marginBottom: Platform.OS === 'android' ? 30 : 50, 
  },
  listItem: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    borderRadius: 8,
    paddingTop: 8,
    minWidth: Platform.OS === 'android' ? '90%' : 320,
  }
});

export default WorkoutList;