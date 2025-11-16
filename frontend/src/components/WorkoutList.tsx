import React, { useState } from 'react'
import { StyleSheet, Text, View, Dimensions, Platform, } from 'react-native'
import { FlatList } from 'react-native'
import { useQueryClient } from '@tanstack/react-query'
import useGetWorkoutList from '../hooks/useGetWorkoutList'
import { WorkoutListProps } from '../types/componentProps'
import { WorkoutItem } from '../types/workoutItemTypes'
import getWorkoutItem from '../services/workoutItem/getWorkoutItem'
import { Themes } from "../../assets/styles/Themes"
import { useTheme } from '../context/ThemeContext'
import ExerciseNavigation from './navigation/ExerciseNavigation'
import Button from './Button'
import { useWindowDimensions } from 'react-native';
import FilterDropdown from './FilterDropdown';


const WorkoutList = ({ workoutList, setWorkoutList, setIsEditMode, setWorkoutItem }: WorkoutListProps) => {
  
  const ITEM_MIN_WIDTH = 345; 
  const { theme } = useTheme();
  const queryClient = useQueryClient();
  const [exercise, setExercise] = useState('');
  const { width } = useWindowDimensions();
  const horizontalPadding = 16 * 2;
  const numColumns = Math.max( 1, Math.floor((width - horizontalPadding) / ITEM_MIN_WIDTH));

  useGetWorkoutList(setWorkoutList, exercise);
  
  return (
    <View style={[styles.listContainer, {backgroundColor: Themes[theme].background}]}>
      <ExerciseNavigation setExercise={setExercise}/>
      <Text style={[styles.title, {color: Themes[theme].defaultText}]}>Exercise results</Text>
      <FilterDropdown
        options={[
          { label: 'Filter by Name', value: 'name' },
          { label: 'Filter by Date', value: 'date' },
        ]}
        onSelect={(value) => {
          const sortedList = [...workoutList].sort((a, b) => {
            if (value === 'name') return a.name.localeCompare(b.name);
            if (value === 'date') return a.date.localeCompare(b.date);
            return 0;
          });
          setWorkoutList(sortedList);
        }}
      />
      <FlatList
        data={workoutList}
        keyExtractor={(item, index) => index.toString()}
        numColumns={numColumns}
        key={numColumns}
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
              try {
                const workoutItem = await queryClient.fetchQuery({
                  queryKey: ['workoutItem', item.id],
                  queryFn: () => getWorkoutItem(item.id)
                });

                setWorkoutItem(workoutItem);
                setIsEditMode(true);
              } catch (err) {
                console.error('Error fetching workout item:', err);
                alert('Failed to load workout. Please try again later.');
              }
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
    marginHorizontal: Platform.OS === 'android' || Platform.OS === 'ios' ? 0 : 10,
    alignItems: Platform.OS === 'android' || Platform.OS === 'ios' ? 'center' : 'flex-start',
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
  title: {
    fontSize: 22, 
    fontFamily: 'MerriweatherSans', 
    fontWeight: Platform.OS === 'android' || Platform.OS === 'ios' ? '700' : '500',
    marginHorizontal: Platform.OS === 'android' || Platform.OS === 'ios' ? 0 : 8,
    marginVertical: Dimensions.get('window').height < 1000 ? 30 : 50, 
  },
  listItem: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: Platform.OS === 'android' || Platform.OS === 'ios' ? '90%' : 345,
    marginHorizontal: Platform.OS === 'android' || Platform.OS === 'ios' ? 0 : 8,
    marginVertical: 8,
    borderRadius: 10,
    paddingTop: 8,
    }
});

export default WorkoutList;