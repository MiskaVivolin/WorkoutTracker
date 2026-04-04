import React, { useEffect, useState } from "react";
import { Text, TextInput, StyleSheet, Dimensions, Platform, Keyboard, KeyboardAvoidingView, View } from "react-native";
import { set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from "zod";
import Button from "./Button";
import createWorkoutItem from "../services/workoutItem/createWorkoutItem";
import { useUserToken } from "../context/UserTokenContext";
import { AddWorkoutFormProps } from "../types/componentProps";
import { Themes } from "../../assets/styles/Themes";
import { useTheme } from "../context/ThemeContext";
import { WorkoutItem } from "../types/workoutItemTypes";
import PopUp from "./PopUp";


const AddWorkoutForm = ({workoutItem, setWorkoutItem}: AddWorkoutFormProps) => {
  
  type WorkoutFormData = z.infer<typeof workoutSchema>
  const workoutSchema = z.object({
    name: z.string().min(1, "Name required"),
    date: z.string().min(1, "Date required"),
    exercise: z.string().min(1, "Exercise required"),
    result: z.string().min(1, "Result required")
  })
  const { theme } = useTheme()
  const { userToken } = useUserToken();
  const { register, handleSubmit, setValue, watch, clearErrors, formState: { errors }, reset } = useForm<WorkoutFormData>({
      resolver: zodResolver(workoutSchema),
      defaultValues: {
          name: workoutItem.name,
          date: workoutItem.date,
          exercise: workoutItem.exercise,
          result: workoutItem.result
      }
  })
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const queryClient = useQueryClient();
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

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
  

  const mutation = useMutation({
    mutationFn: async ({ workoutItem, username }: { workoutItem: WorkoutItem; username: string }) => {
      return await createWorkoutItem(workoutItem, username);
    },
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({ queryKey: ['workouts'] });

      setPopupVisible(true);
      setPopupMessage('Workout added successfully!');

      setTimeout(() => {
        setPopupVisible(false);
      }, 2500);
    },
    onError: (error) => {
      console.error("Workout submission failed:", error);
    },
  });


  const onSubmit = async () => {
    if (!userToken) {
      console.error("User token is undefined");
      return;
    }
    mutation.mutate({ workoutItem, username: userToken });
  };

  return (
    <KeyboardAvoidingView
      style={styles.addWorkoutContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
      {!keyboardVisible && (
      <Text style={[styles.title, { color: Themes[theme].defaultText }]}>Add a new exercise result</Text>
      )}          
      <Text style={[styles.label, {color: Themes[theme].defaultText}]}>Name</Text>
      <TextInput
        style={[styles.inputField, {color: Themes[theme].defaultText, borderColor: Themes[theme].border, backgroundColor: Themes[theme].inputField}]}
        {...register("name")}
        onChangeText={(name) => {
          setValue("name", name)
          setWorkoutItem({ ...workoutItem, name })
          clearErrors('name')
        }}
        value={watch("name")}
        />
      {errors.name && <Text style={[styles.errorText, {color: Themes[theme].errorText}]}>{errors.name.message}</Text>}

      <Text style={[styles.label, {color: Themes[theme].defaultText}]}>Date</Text>
      <TextInput
        style={[styles.inputField, {color: Themes[theme].defaultText, borderColor: Themes[theme].border, backgroundColor: Themes[theme].inputField}]}
        {...register("date")}
        onChangeText={(date) => {
          setValue("date", date)
          setWorkoutItem({ ...workoutItem, date })
          clearErrors('date')
        }}
        value={watch("date")}
      />
      {errors.date && <Text style={[styles.errorText, {color: Themes[theme].errorText}]}>{errors.date.message}</Text>}

      <Text style={[styles.label, {color: Themes[theme].defaultText}]}>Exercise</Text>
      <TextInput
        style={[styles.inputField, {color: Themes[theme].defaultText, borderColor: Themes[theme].border, backgroundColor: Themes[theme].inputField}]}
        {...register("exercise")}
        onChangeText={(exercise) => {
          setValue("exercise", exercise)
          setWorkoutItem({ ...workoutItem, exercise })
          clearErrors('exercise')
        }}
        value={watch("exercise")}
      />
      {errors.exercise && <Text style={[styles.errorText, {color: Themes[theme].errorText}]}>{errors.exercise.message}</Text>}

      <Text style={[styles.label, {color: Themes[theme].defaultText}]}>Result</Text>
      <TextInput
        style={[styles.inputField, {color: Themes[theme].defaultText, borderColor: Themes[theme].border, backgroundColor: Themes[theme].inputField}]}
        {...register("result")}
        onChangeText={(result) => {
          setValue("result", result)
          setWorkoutItem({ ...workoutItem, result })
          clearErrors('result')
        }}
        value={watch("result")}
      />
      {errors.result && <Text style={[styles.errorText, {color: Themes[theme].errorText}]}>{errors.result.message}</Text>}
      <Button
        title={mutation.status === 'pending' ? "Submitting..." : "Add"}
        onPress={handleSubmit(onSubmit)}
        buttonStyle={{ marginTop: 60 }}
        disabled={mutation.status === 'pending'}
      />

      {mutation.status === 'error' && (
        <Text style={[styles.errorText, { color: Themes[theme].errorText }]}>
          Failed to submit. Please try again.
        </Text>
      )}

      {mutation.status === 'success' && (
        <PopUp popupVisible={popupVisible} message={popupMessage}/>
      )}

    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  addWorkoutContainer: {
    flex: 1,
    alignSelf: "center",
    alignItems: 'center',
    justifyContent: 'center',
    width: Platform.OS === 'android' || Platform.OS === 'ios' ? '80%' : 350,

  },
  label: {
    alignSelf: "flex-start",
    width: Platform.OS === 'android' || Platform.OS === 'ios' ? '100%' : 350,
    fontSize: 13,
    fontFamily: 'MerriweatherSans',
    marginBottom: 2,
    marginTop: 12
  },
  title: {
    fontSize: 22,
    fontWeight: Platform.OS === 'android' || Platform.OS === 'ios' ? '700' : '500', 
    fontFamily: 'MerriweatherSans', 
    marginBottom: Dimensions.get('window').height < 1000 ? 30 : 50, 
  },
  inputField: {
    fontFamily: 'MerriweatherSans',
    fontSize: 13,
    width: Platform.OS === 'android' || Platform.OS === 'ios' ? '100%' : 350,
    height: 35,
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: Platform.OS === 'android' || Platform.OS === 'ios' ? 6 : 12,
    paddingHorizontal: 8,
    ...Platform.select({
      android: {
        paddingBottom: 8,
        lineHeight: 15,
      },
    }),
  },
  errorText: {
    fontSize: 13,
    fontFamily: 'MerriweatherSans', 
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalContent: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 12,
    elevation: 5,
  },

  modalText: {
    fontSize: 16,
    fontFamily: "MerriweatherSans",
  },
});

export default AddWorkoutForm