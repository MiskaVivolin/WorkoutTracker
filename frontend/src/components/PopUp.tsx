import React, { useState, useEffect } from 'react';
import { View, Text, Animated, StyleSheet, Dimensions } from 'react-native';
import { PopUpProps } from '../types/Types';

const PopUp = ({setValidationInit, setPressedAdd, workoutItemFieldIsValid, setWorkoutItemFieldIsValid}: PopUpProps) => {
  const [visible, setVisible] = useState(true);
  const fadeAnim = new Animated.Value(0);


  useEffect(() => {
    if (visible) {
      console.log("workoutItemIsValid, ", workoutItemFieldIsValid)
      fadeIn();
      const fadeTimeout = setTimeout(() => {
        fadeOut(); 
      }, 1000);
      return () => clearTimeout(fadeTimeout);
    }
  }, [visible]); 

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
      setPressedAdd(false)
      setWorkoutItemFieldIsValid({ name: false, date: false, exercise: false, result: false })
      setValidationInit(false)
    });
  };

  return (
    <View style={styles.container}>
      {visible && workoutItemFieldIsValid && (
        <View
          style={[
            styles.popup,
            { opacity: fadeAnim }, 
          ]}
        >
          <Text style={styles.popupText}>Object Added</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  popup: {
    position: 'absolute',
    padding: 50,
    bottom: 400,
    
    transform: [{ translateX: -75 }],
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  popupText: {
    color: '#fff',
    fontSize: 16,
  },
  labelButton: {
    fontSize: 15, 
    fontFamily: 'MerriweatherSans',
    fontWeight: '500', 
    color: 'white', 
    alignSelf: 'center', 
  },
    button: {
      alignSelf: 'center',
      width: 95,
      padding: 7,
      marginTop: Dimensions.get('window').height < 1000 ? 30 : 70,
      backgroundColor: '#6aa9a9',
      borderRadius: 10, 
      borderWidth: 1, 
      borderColor: '#678e8e',
      textAlign: 'center',
      fontSize: 16,
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
    },
});

export default PopUp;