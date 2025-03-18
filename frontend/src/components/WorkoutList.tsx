import React from 'react'
import { StyleSheet, Text, View, Pressable, Dimensions } from 'react-native'
import { FlatList } from 'react-native'
import useGetWorkoutList from '../hooks/useGetWorkoutList'
import { WorkoutItem, WorkoutListProps } from '../types/Types'
import getWorkoutItem from '../functions/getWorkoutItem'
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
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.text, {color: Themes[theme].defaultText}]}>{item.name}</Text>
            <Text style={[styles.text, {color: Themes[theme].defaultText}]}>{item.date}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.text, {color: Themes[theme].defaultText}]}>{item.exercise}</Text>
            <Text style={[styles.text, {color: Themes[theme].defaultText}]}>{item.result}</Text>
          </View>
          <Button 
          title='Edit'
          onPress={() => {
            getWorkoutItem(item.id, setWorkoutItem)
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
  text: {
    fontSize: 15,
    fontFamily: 'MerriweatherSans',
    marginVertical: 4,
    marginHorizontal: 20
  },
  header: {
    fontSize: Dimensions.get('window').width < 320 ? 22 : 24, 
    fontFamily: 'MerriweatherSans', 
    marginTop: Dimensions.get('window').height < 1000 ? 30 : 50,
    marginBottom: Dimensions.get('window').height < 1000 ? 30 : 50, 
  },
  listItem: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    borderRadius: 8,
    paddingTop: 8,
    minWidth: Dimensions.get('window').width < 320 ? 270 : 280,
    maxWidth: Dimensions.get('window').width < 360 ? 270 : 320,
  }
});

export default WorkoutList;