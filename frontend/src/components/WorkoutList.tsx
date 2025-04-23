import React from 'react'
import { StyleSheet, Text, View, Dimensions, Platform, } from 'react-native'
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
            <Text style={[styles.label, {color: Themes[theme].greyText}]}>Name</Text>
            <Text style={[styles.label, {color: Themes[theme].greyText}]}>Date</Text>
          </View>
          <View style={styles.labelContainer}>
            <Text style={[styles.labelData, {color: Themes[theme].defaultText}]}>{item.name}</Text>
            <Text style={[styles.labelData, {color: Themes[theme].defaultText}]}>{item.date}</Text>
          </View>
          <View style={styles.labelContainer}>
            <Text style={[styles.label, {color: Themes[theme].greyText}]}>Exercise</Text>
            <Text style={[styles.label, {color: Themes[theme].greyText}]}>Result</Text>
          </View>
          <View style={styles.labelContainer}>
            <Text style={[styles.labelData, {color: Themes[theme].defaultText}]}>{item.exercise}</Text>
            <Text style={[styles.labelData, {color: Themes[theme].defaultText}]}>{item.result}</Text>
          </View>
          <Button
            buttonStyle={{marginTop: 6, marginBottom: 10}}
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
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    width: '50%',
    fontWeight: '100',
    fontSize: 12,
    fontFamily: 'MerriweatherSans',
    marginBottom: 2
  },
  labelData: {
    width: '50%',
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'MerriweatherSans',
    marginBottom: 8,
  },
  labelContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  header: {
    fontSize: Platform.OS === 'android' || Platform.OS === 'ios' ? 20 : 24, 
    fontFamily: 'MerriweatherSans', 
    marginTop: Dimensions.get('window').height < 1000 ? 30 : 50,
    marginBottom: Dimensions.get('window').height < 1000 ? 30 : 50, 
  },
  listItem: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: Platform.OS === 'android' || Platform.OS === 'ios' ? '90%' : 345,
    marginVertical: 8,
    borderRadius: 8,
    paddingTop: 8,
    }
});

export default WorkoutList;