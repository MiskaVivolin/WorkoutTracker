import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import NavButton from './NavButton';
import { ExerciseNavigationProps } from '../../types/componentProps';


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
    marginHorizontal: Dimensions.get('window').width < 500 ? 0 : 4,
    paddingTop: 10
  }
})

export default ExerciseNavigation;