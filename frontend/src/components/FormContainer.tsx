import React from "react";
import { View, Text, TextInput, StyleSheet, Dimensions, Platform } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "./Button";
import createWorkoutItem from "../services/createWorkoutItem";
import { useUserToken } from "../context/UserTokenContext";
import { FormContainerBetaProps } from "../types/componentProps";
import { Themes } from "../../assets/styles/Themes";
import { useTheme } from "../context/ThemeContext";
import { z } from "zod";


const FormContainer = ({workoutItem, setWorkoutItem}: FormContainerBetaProps) => {
  
  type WorkoutFormData = z.infer<typeof workoutSchema>
  const workoutSchema = z.object({
    name: z.string().min(1, "Name must not be empty"),
    date: z.string().min(1, "Date must not be empty"),
    exercise: z.string().min(1, "Exercise must not be empty"),
    result: z.string().min(1, "Result must not be empty")
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

  const onSubmit = async () => {
    try {
      if (!userToken){
        throw new Error("User token is undefined")
      } 
      await createWorkoutItem(workoutItem, userToken)
      reset()
    } catch (err) {
      console.error("Failed to submit workout item: ", err)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.header, {color: Themes[theme].defaultText}]}>Add a new exercise result</Text>
        
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
      <Button title="Add" onPress={handleSubmit(onSubmit)} buttonStyle={{marginTop: 60}} />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: Platform.OS === 'android' || Platform.OS === 'ios' ? '100%' : 350,
    },
    label: {
      alignSelf: "flex-start",
      marginHorizontal: "10%",
      fontSize: 13,
      fontFamily: 'MerriweatherSans',
      marginBottom: 2,
      marginTop: 12
    },
    header: {
      fontSize: Platform.OS === 'android' || Platform.OS === 'ios' ? 20 : 24, 
      fontFamily: 'MerriweatherSans', 
      marginTop: Dimensions.get('window').height < 1000 ? 50 : 140,
      marginBottom: Dimensions.get('window').height < 1000 ? 30 : 50, 
    },
    inputField: {
      fontFamily: 'MerriweatherSans',
      fontSize: 13,
      width: Platform.OS === 'android' || Platform.OS === 'ios' ? '80%' : 350,
      borderWidth: 1,
      borderRadius: 4,
      marginBottom: Dimensions.get('window').height < 1000 ? 8 : 12,
      paddingHorizontal: 8,
      ...Platform.select({
        android: {
          paddingBottom: 8,
          lineHeight: 15,
        },
        default: {
          height: 35,
        },
      }),
    },
    errorText: {
      fontSize: 13,
      fontFamily: 'MerriweatherSans', 
    },
  });

  export default FormContainer