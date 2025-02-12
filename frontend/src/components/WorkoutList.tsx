import React from 'react'
import { StyleSheet, Text, View, Pressable, Dimensions } from 'react-native'
import { FlatList } from 'react-native'
import useGetWorkoutList from '../hooks/useGetWorkoutList'
import { WorkoutItem, WorkoutListProps } from '../types/Types'
import GetWorkoutItem from '../functions/GetWorkoutItem'
import { Themes } from "../../assets/styles/Themes"
import { useTheme } from '../context/ThemeContext'
import Button from './Button'


const WorkoutList = ({ workoutList, setWorkoutList, setIsEditMode, setWorkoutItem }: WorkoutListProps) => {

  const { theme } = useTheme();
  
  useGetWorkoutList(setWorkoutList);
  
  return (
  <View style={[styles.listContainer, {backgroundColor: Themes[theme].background}]}>
      <Text style={[styles.header, {color: Themes[theme].secondaryText}]}>Exercise results</Text>
      <FlatList
        data={workoutList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }: {item: WorkoutItem}) =>
          <View style={[styles.listItem, {backgroundColor: Themes[theme].primary, borderColor: Themes[theme].border}]}>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.text, {color: Themes[theme].secondaryText}]}>{item.name}</Text>
            <Text style={[styles.text, {color: Themes[theme].secondaryText}]}>{item.date}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.text, {color: Themes[theme].secondaryText}]}>{item.exercise}</Text>
            <Text style={[styles.text, {color: Themes[theme].secondaryText}]}>{item.result}</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
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
    borderWidth: 1,
    borderRadius: 8,
    paddingTop: 8,
    minWidth: Dimensions.get('window').width < 320 ? 270 : 300,
    maxWidth: Dimensions.get('window').width < 360 ? 270 : 340,
  }
});

export default WorkoutList;