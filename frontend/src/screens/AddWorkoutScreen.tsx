import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Keyboard, KeyboardAvoidingView, Dimensions } from 'react-native';
import { AddWorkoutScreenProps } from '../types/screenProps';
import AddWorkoutForm from '../components/AddWorkoutForm';
import TabBar from '../components/navigation/TabBar';
import NavBar from '../components/navigation/NavBar';
import Logo from '../components/Logo';
import { Themes } from '../../assets/styles/Themes';
import { useTheme } from '../context/ThemeContext';


const AddWorkoutScreen: React.FC<AddWorkoutScreenProps> = ({ navigation }) => {
  
  const [workoutItem, setWorkoutItem] = useState({ id: 0, name: '', date: '', exercise: '', result: '' })
  const { theme } = useTheme();
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const mobileView = Dimensions.get('window').width < 500;
  
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <View style={[styles.container,{ backgroundColor: Themes[theme].background}]}>
      {mobileView ?
        <KeyboardAvoidingView style={{flex: 1}}>
          <Logo />
            <AddWorkoutForm workoutItem={workoutItem} setWorkoutItem={setWorkoutItem}/>
          {!keyboardVisible && (
          <TabBar navigation={navigation}/>
          )}
        </KeyboardAvoidingView>
      :
        <View style={{flex: 1}}>
          <NavBar navigation={navigation} />
          <AddWorkoutForm workoutItem={workoutItem} setWorkoutItem={setWorkoutItem}/>
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%'
  }
})

export default AddWorkoutScreen;