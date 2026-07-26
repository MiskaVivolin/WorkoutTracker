import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
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
  
  const [isEditMode, setIsEditMode] = useState(false)
  const [workoutItem, setWorkoutItem] = useState<WorkoutItem>({ id: 0, name: '', date: '', exercise: '', result: '' })
  const { theme } = useTheme();
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const mobileView = Dimensions.get('window').width < 500;

  return (
    <View style={[styles.container, { backgroundColor: Themes[theme].background }]}>
      {mobileView ? (
        <View style={{ flex: 1 }}>
          <Logo textStyle={{marginBottom: 5}}/>
          {isEditMode ? (
            <WorkoutEditor 
              workoutItem={workoutItem} 
              setIsEditMode={setIsEditMode}   
              showPopup={(message: string) => {
              setPopupMessage(message);
              setPopupVisible(true);

              setTimeout(() => {
                setPopupVisible(false);
              }, 2500);
            }}/>
          ) : (
            <>
            <WorkoutList setIsEditMode={setIsEditMode} setWorkoutItem={setWorkoutItem} popupVisible={popupVisible} popupMessage={popupMessage} />
            <TabBar navigation={navigation} />
            </>
          )}
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <NavBar navigation={navigation} />
          {isEditMode ? (
            <WorkoutEditor
              workoutItem={workoutItem} 
              setIsEditMode={setIsEditMode}   
              showPopup={(message: string) => {
              setPopupMessage(message);
              setPopupVisible(true);

              setTimeout(() => {
                setPopupVisible(false);
              }, 2500);
            }} />
          ) : (
            <WorkoutList setIsEditMode={setIsEditMode} setWorkoutItem={setWorkoutItem} popupVisible={popupVisible} popupMessage={popupMessage} />
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