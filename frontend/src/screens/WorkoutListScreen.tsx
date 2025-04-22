import React, { useState } from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { WorkoutListScreenProps } from '../types/screenProps';
import { WorkoutItem } from '../types/workoutItemTypes';
import WorkoutList from '../components/WorkoutList';
import NavBar from '../components/navigation/NavBar';
import WorkoutEditor from '../components/WorkoutEditor';
import { Themes } from '../../assets/styles/Themes'
import { useTheme } from '../context/ThemeContext';
import TabBar from '../components/navigation/TabBar';
import Logo from '../components/Logo';

const WorkoutListScreen: React.FC<WorkoutListScreenProps> = ({ navigation }) => {
  
  const [workoutList, setWorkoutList] = useState<WorkoutItem[]>([])
  const [isEditMode, setIsEditMode] = useState(false)
  const [workoutItem, setWorkoutItem] = useState<WorkoutItem>({ id: 0, name: '', date: '', exercise: '', result: '' })
  const { theme } = useTheme();
  const mobileView = Platform.OS === 'android' || Platform.OS === 'ios';

  return (
    <View style={[styles.container, { backgroundColor: Themes[theme].background }]}>
      {mobileView ? (
        <View style={{ flex: 1 }}>
          <Logo />
          {isEditMode ? (
            <WorkoutEditor workoutItem={workoutItem} setIsEditMode={setIsEditMode} setWorkoutList={setWorkoutList} />
          ) : (
            <WorkoutList workoutList={workoutList} setWorkoutList={setWorkoutList} setIsEditMode={setIsEditMode} setWorkoutItem={setWorkoutItem} />
          )}
          <TabBar navigation={navigation} />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <NavBar navigation={navigation} />
          {isEditMode ? (
            <WorkoutEditor workoutItem={workoutItem} setIsEditMode={setIsEditMode} setWorkoutList={setWorkoutList} />
          ) : (
            <WorkoutList workoutList={workoutList} setWorkoutList={setWorkoutList} setIsEditMode={setIsEditMode} setWorkoutItem={setWorkoutItem} />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default WorkoutListScreen;