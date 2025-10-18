import React from 'react';
import { View } from 'react-native';
import NavButton from './NavButton';
import { Dispatch, SetStateAction } from 'react';

interface ExerciseNavigationProps {
  setExercise: Dispatch<SetStateAction<string>>;
}

const ExerciseNavigation: React.FC<ExerciseNavigationProps> = ({ setExercise }) => {
  return (
    <View style={{ flexDirection: 'row', paddingTop: 10 }}>
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

export default ExerciseNavigation;