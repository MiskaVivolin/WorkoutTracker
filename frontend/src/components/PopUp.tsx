import React, { useState, useEffect } from 'react';
import { View, Text, Animated, StyleSheet, Dimensions, Pressable } from 'react-native';
import { PopUpProps } from '../types/Types';

const PopUp: React.FC<PopUpProps> = ({setValidationInit, setPressedAdd}) => {
  const [visible, setVisible] = useState(false); // Controls visibility of the popup
  const fadeAnim = new Animated.Value(0); // Initial opacity value for animation

  const handleClick = () => {
    setVisible(true); // Make the popup visible immediately
    console.log("sss")
    setValidationInit(true)
    setPressedAdd(true)
  };

  // ei toimi vielä

  useEffect(() => {
    if (visible) {
      fadeIn(); // Start the fade-in animation when popup becomes visible
      const fadeTimeout = setTimeout(() => {
        fadeOut(); // After 1.5 seconds, fade out
      }, 1500);

      // Clean up the timeout if the component unmounts
      return () => clearTimeout(fadeTimeout);
    }
  }, [visible]); // Trigger useEffect whenever `visible` changes

  // Fade-in animation
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1, // Full opacity
      duration: 500, // Duration of the fade-in
      useNativeDriver: true,
    }).start();
  };

  // Fade-out animation
  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0, // Fade out to opacity 0
      duration: 500, // Duration of the fade-out
      useNativeDriver: true,
    }).start(() => {
      setVisible(false); // Hide the popup after fading out
    });
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.button}
        onPress={
            handleClick}>
        <Text style={styles.labelButton}>Add</Text>  
      </Pressable>

      {/* Conditionally render the popup only if it's visible */}
      {visible && (
        <Animated.View
          style={[
            styles.popup,
            { opacity: fadeAnim }, // Bind the opacity to the fadeAnim value
          ]}
        >
          <Text style={styles.popupText}>Object Added</Text>
        </Animated.View>
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
    bottom: 50,
    left: '50%',
    transform: [{ translateX: -75 }], // Center horizontally
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