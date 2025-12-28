import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import NavButton from './NavButton';
import { Dispatch, SetStateAction } from 'react';

interface ExerciseNavigationProps {
  setExercise: Dispatch<SetStateAction<string>>;
}

const ExerciseNavigation: React.FC<ExerciseNavigationProps> = ({ setExercise }) => {
  return (
    <View style={styles.container}>
      <NavButton
        title="All"
        onPress={() => setExercise('')}
      />
      <NavButton
        title="Bench"
        onPress={() => setExercise('Bench')}
      />
      <NavButton
        title="Squat"
        onPress={() => setExercise('Squat')}
      />
      <NavButton
        title="Deadlift"
        onPress={() => setExercise('Deadlift')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    marginHorizontal: Platform.OS === 'android' || Platform.OS === 'ios' ? 0 : 4,
    paddingTop: 10
  }
})

export default ExerciseNavigation;