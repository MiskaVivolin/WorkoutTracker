import React, { useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, Dimensions, } from 'react-native'
import { WorkoutEditorProps } from '../types/componentProps'
import deleteWorkoutItem from '../services/deleteWorkoutItem'
import editWorkoutItem from '../services/editWorkoutItem'
import Button from './Button'
import { Themes } from '../../assets/styles/Themes'
import { useTheme } from '../context/ThemeContext'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'


const WorkoutEditor = ({ workoutItem, setIsEditMode, setWorkoutList }: WorkoutEditorProps) => {
  
  type WorkoutFormData = z.infer<typeof workoutSchema>
  const workoutSchema = z.object({
    name: z.string().min(1, "Name must not be empty"),
    date: z.string().min(1, "Date must not be empty"),
    exercise: z.string().min(1, "Exercise must not be empty"),
    result: z.string().min(1, "Result must not be empty")})

  const { theme } = useTheme();
  const { register, handleSubmit, setValue, watch, clearErrors, formState: { errors }, reset } = useForm<WorkoutFormData>({
      resolver: zodResolver(workoutSchema),
      defaultValues: {
        name: workoutItem.name,
        date: workoutItem.date,
        exercise: workoutItem.exercise,
        result: workoutItem.result
      }
  })

  useEffect(() => {
    reset({
      name: workoutItem.name,
      date: workoutItem.date,
      exercise: workoutItem.exercise,
      result: workoutItem.result,
    });
    console.log(workoutItem.name)
  }, [workoutItem, reset]);

  const onSubmit = (data: WorkoutFormData) => {

    const updatedWorkoutItem = {
      ...workoutItem,
      name: data.name,
      date: data.date,
      exercise: data.exercise,
      result: data.result
    };

    setIsEditMode(false);
    editWorkoutItem(updatedWorkoutItem)
  };

  return (
    <View style={[styles.container, { backgroundColor: Themes[theme].background }]}>      
      <View style={[styles.listItem, { backgroundColor: Themes[theme].primary }]}>      
        <Text style={[styles.header, { color: Themes[theme].defaultText }]}>Edit your workout</Text>
        <View style={{ flexDirection: 'row', marginTop: 1, marginBottom: 5 }}>
          <View style={{ flexDirection: 'column' }}>
            <Text style={[styles.label, { color: Themes[theme].defaultText }]}>Name</Text>
            <TextInput
              style={[styles.inputField, { color: Themes[theme].defaultText, backgroundColor: Themes[theme].inputField, borderColor: Themes[theme].border }]}
              {...register("name")}
              onChangeText={name => {
                setValue("name", name)
                clearErrors('name')
              }}
              value={watch("name")}
            />
            {errors.name && <Text style={[styles.inputFieldError, { color: Themes[theme].errorText }]}>{errors.name.message}</Text>}
          </View>
          <View style={{ flexDirection: 'column' }}>
            <Text style={[styles.label, { color: Themes[theme].defaultText }]}>Date</Text>
            <TextInput
              style={[styles.inputField, { color: Themes[theme].defaultText, backgroundColor: Themes[theme].inputField, borderColor: Themes[theme].border }]}
              {...register("date")}
              onChangeText={date => {
                setValue("date", date)
                clearErrors('date')
              }}
              value={watch("date")}
            />
            {errors.date && <Text style={[styles.inputFieldError, { color: Themes[theme].errorText }]}>{errors.date.message}</Text>}
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 1, marginBottom: 5 }}>
          <View style={{ flexDirection: 'column' }}>
            <Text style={[styles.label, { color: Themes[theme].defaultText }]}>Exercise</Text>
            <TextInput
              style={[styles.inputField, { color: Themes[theme].defaultText, backgroundColor: Themes[theme].inputField, borderColor: Themes[theme].border }]}
              {...register("exercise")}
              onChangeText={exercise => {
                setValue("exercise", exercise)
                clearErrors('exercise')
              }}
              value={watch("exercise")}
            />
            {errors.exercise && <Text style={[styles.inputFieldError, { color: Themes[theme].errorText }]}>{errors.exercise.message}</Text>}
          </View>
          <View style={{ flexDirection: 'column' }}>
            <Text style={[styles.label, { color: Themes[theme].defaultText }]}>Result</Text>
            <TextInput
              style={[styles.inputField, { color: Themes[theme].defaultText, backgroundColor: Themes[theme].inputField, borderColor: Themes[theme].border }]}
              {...register("result")}
              onChangeText={result => {
                setValue("result", result)
                clearErrors('result')
              }}
              value={watch("result")}
            />
            {errors.result && <Text style={[styles.inputFieldError, { color: Themes[theme].errorText }]}>{errors.result.message}</Text>}
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button 
            title='Save' 
            onPress={handleSubmit(onSubmit)} />
          <Button 
            title='Delete' 
            style={{ backgroundColor: Themes[theme].deleteButton }} 
            onPress={() => {
              deleteWorkoutItem(workoutItem.id, setWorkoutList)
              setIsEditMode(false) 
            }} />
          <Button 
            title='Cancel' 
            onPress={() => setIsEditMode(false)} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputField: {
    fontSize: 12,
    fontFamily: 'MerriweatherSans',
    marginHorizontal: 10,
    width: Dimensions.get('window').width < 420 ? 130 : 180,
    height: 30, 
    borderWidth: 1, 
    borderRadius: 3,
    paddingHorizontal: 8,
  },
  listItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width < 420 ? 300 : 400,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 8,
    padding: 6,
  },
  label: {
    fontSize: 13,
    fontFamily: 'MerriweatherSans',
    marginBottom: 2,
    marginHorizontal: 10,
    marginTop: 5
  },
  header: {
    fontSize: 18, 
    fontFamily: 'MerriweatherSans', 
    marginVertical: 12 
  },
  inputFieldError: {
    fontSize: 13,
    fontFamily: 'MerriweatherSans',
    paddingVertical: 5,
    marginLeft: 10
  },
  buttonContainer: {
    flexDirection: 'row', 
    paddingTop: 3, 
    width: Dimensions.get('window').width < 420 ? 300 : 400,
    justifyContent: 'space-between',
  }
})

export default WorkoutEditor;