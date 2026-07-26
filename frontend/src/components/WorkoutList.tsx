import { useMemo, useState } from 'react'
import { StyleSheet, Text, View, Dimensions, Platform, } from 'react-native'
import { FlatList } from 'react-native'
import { useQueryClient } from '@tanstack/react-query'
import useWorkoutList from '../hooks/useWorkoutList'
import { WorkoutListProps } from '../types/componentProps'
import { WorkoutItem } from '../types/workoutItemTypes'
import getWorkoutItem from '../services/workoutItem/getWorkoutItem'
import { Themes } from "../../assets/styles/Themes"
import { useTheme } from '../context/ThemeContext'
import ExerciseNavigation from './navigation/ExerciseNavigation'
import Button from './Button'
import { useWindowDimensions } from 'react-native';
import SortDropdown from './SortDropdown';
import SearchBar from './SearchBar';
import { useUserToken } from '../context/UserTokenContext'
import PopUp from './PopUp'


const WorkoutList = ({ setIsEditMode, setWorkoutItem, popupVisible, popupMessage }: WorkoutListProps) => {
  
  const ITEM_MIN_WIDTH = 345; 
  const { theme } = useTheme();
  const queryClient = useQueryClient();
  const { width } = useWindowDimensions();
  const horizontalPadding = 16 * 2;
  const numColumns = Math.max( 1, Math.floor((width - horizontalPadding) / ITEM_MIN_WIDTH));
  const [exercise, setExercise] = useState(''); 
  const [searchText, setSearchText] = useState('');
  const [sortMode, setSortMode] = useState('Newest');
  const { userToken } = useUserToken();

  const { data: workoutList = [] } = useWorkoutList(userToken, exercise);


  const sortedWorkoutList = useMemo(() => {
    const parseDate = (str: string) => {
      const [day, month, year] = str.split('.').map(Number);
      return new Date(year, month - 1, day).getTime();
    };

    const sorted = [...workoutList].sort((a, b) => {
      if (sortMode === 'Newest') return parseDate(b.date) - parseDate(a.date);
      if (sortMode === 'Oldest') return parseDate(a.date) - parseDate(b.date);
      return 0;
    });
    console.log(sorted)
    return sorted;
  }, [workoutList, sortMode]);

  const filteredWorkoutList = useMemo(() => {
    if (!searchText.trim()) {
      return sortedWorkoutList;
    }

    const lower = searchText.toLowerCase();
    return sortedWorkoutList.filter(item =>
      item.exercise.toLowerCase().includes(lower) ||
      item.date.toLowerCase().includes(lower) ||
      item.weight.toString().includes(lower) ||
      item.reps.toString().includes(lower)
    );
  }, [sortedWorkoutList, searchText]);

  if (!userToken) return null;

  const EmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={[styles.emptyText, { color: Themes[theme].greyText }]}>
        No results added
      </Text>
    </View>
  );
  
  return (
    <View style={[styles.listContainer, {backgroundColor: Themes[theme].background}]}>
      <ExerciseNavigation setExercise={setExercise}/>
      <Text style={[styles.title, {color: Themes[theme].defaultText}]}>Exercise results</Text>
      <View style={styles.topBar}>
        <SortDropdown
          options={[
            { label: 'Newest First', value: 'Newest' },
            { label: 'Oldest First', value: 'Oldest' },
          ]}
          onSelect={setSortMode}
        />

        <SearchBar
          value={searchText}
          onChange={setSearchText}
        />
      </View>
      <FlatList
        style={{ width: '100%'}}
        data={filteredWorkoutList}
        keyExtractor={(item, index) => index.toString()}
        numColumns={numColumns}
        key={numColumns}
        ListEmptyComponent={EmptyList}
        contentContainerStyle={
          filteredWorkoutList.length === 0 && styles.emptyListContent
        }
        renderItem={({ item }: {item: WorkoutItem}) =>
        <View style={[styles.listItem, {backgroundColor: Themes[theme].primary}]}>
          <View style={[styles.labelContainer]}>
            <View style={styles.labelColumn}>
              <Text style={[styles.label, {color: Themes[theme].greyText}]}>Exercise</Text>
              <Text style={[styles.labelData, {color: Themes[theme].defaultText}]}>{item.exercise}</Text>
            </View>
            <View style={styles.labelColumn}>
              <Text style={[styles.label, {color: Themes[theme].greyText}]}>Date</Text>
              <Text style={[styles.labelData, {color: Themes[theme].defaultText}]}>{new Date(item.date).toLocaleDateString()}</Text>
            </View>
            <Button
              buttonStyle={{}}
              title='Edit'
              onPress={async () => {
                try {
                  const workoutItem = await queryClient.fetchQuery({
                    queryKey: ['workoutItem', item.id],
                    queryFn: () => getWorkoutItem(item.id)
                  });

                  setWorkoutItem({
                    ...workoutItem,
                    date: new Date(workoutItem.date)
                  });
                  setIsEditMode(true);
                } catch (err) {
                  console.error('Error fetching workout item:', err);
                  alert('Failed to load workout. Please try again later.');
                }
              }}
            />
          </View>
          
          <View style={styles.labelContainer}>
            <View style={styles.labelColumn}>
              <Text style={[styles.label, {color: Themes[theme].greyText}]}>Weight in kg</Text>
              <Text style={[styles.labelData, {color: Themes[theme].defaultText}]}>{item.weight}</Text>
            </View>
            <View style={styles.labelColumn}>
              <Text style={[styles.label, {color: Themes[theme].greyText}]}>Reps</Text>
              <Text style={[styles.labelData, {color: Themes[theme].defaultText}]}>{item.reps}</Text>
          </View>
            <View style={{width: 80}}></View>
          </View>
        </View>}
      />
        <PopUp popupVisible={popupVisible} message={popupMessage} />
    </View>
  )
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    width: '100%',
    marginHorizontal: Dimensions.get('window').width < 500 ? 0 : 10,
    alignItems: Dimensions.get('window').width < 500 ? 'center' : 'flex-start',
    justifyContent: 'center',
  },
  topBar: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: Dimensions.get('window').width < 500 ? 'center' : 'flex-start',
    marginBottom: 10,
    zIndex: 20,
    elevation: 20,
  },
  label: {
    width: '100%',
    fontWeight: '100',
    fontSize: 12,
    fontFamily: 'Inter18',
    marginBottom: 2,
  },
  labelData: {
    width: '100%',
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'Inter18',
    marginBottom: 10,
  },
  labelContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'space-between'
  },
  labelColumn: {
    flex: 1,
    flexDirection: 'column'
  },
  title: {
    fontSize: 22, 
    fontFamily: 'Inter24', 
    fontWeight: Dimensions.get('window').width < 500 ? '700' : '500',
    paddingLeft: 5,
    marginHorizontal: Dimensions.get('window').width < 500 ? 0 : 8,
    marginVertical: Dimensions.get('window').height < 1000 ? 30 : 50, 
  },
  listItem: {
    alignItems: 'center',
    alignSelf: 'center',
    width: Dimensions.get('window').width < 500 ? '85%' : 350,
    marginHorizontal: Dimensions.get('window').width < 500 ? 0 : 8,
    marginVertical: 8,
    borderRadius: 10,
    paddingTop: 12,
    paddingBottom: 4
  },
  emptyContainer: {
    flex: 1,
    padding: 6,
    paddingTop: 40,
  },
  emptyText: {
    fontSize: 16,
    opacity: 0.7,
  },
  emptyListContent: {
    flexGrow: 1,
  },
});

export default WorkoutList;