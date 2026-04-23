import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, Dimensions, Platform, } from 'react-native'
import { WorkoutEditorProps } from '../types/componentProps'
import deleteWorkoutItem from '../services/workoutItem/deleteWorkoutItem'
import editWorkoutItem from '../services/workoutItem/editWorkoutItem'
import Button from './Button'
import { Themes } from '../../assets/styles/Themes'
import { useTheme } from '../context/ThemeContext'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import NumberDropdown from './Numberdropdown.tsx'


const WorkoutEditor = ({ workoutItem, setIsEditMode, showPopup }: WorkoutEditorProps) => {
  
  type WorkoutFormData = z.infer<typeof workoutSchema>
  const queryClient = useQueryClient();
  const workoutSchema = z.object({
    exercise: z.string().min(1, "Exercise required"),
    date: z.string().min(1, "Date required"),
    sets: z.number().min(1, "Sets required"),
    reps: z.number().min(1, "Reps required")})

  const { theme } = useTheme();
  const { register, handleSubmit, setValue, watch, clearErrors, formState: { errors }, reset } = useForm<WorkoutFormData>({
      resolver: zodResolver(workoutSchema),
      defaultValues: {
        exercise: workoutItem.exercise,
        date: workoutItem.date,
        sets: workoutItem.sets,
        reps: workoutItem.reps
      }
  })

  useEffect(() => {
    reset({
      exercise: workoutItem.exercise,
      date: workoutItem.date,
      sets: workoutItem.sets,
      reps: workoutItem.reps
    });
  }, [workoutItem, reset]);

  const { mutateAsync: editWorkout } = useMutation({
    mutationFn: editWorkoutItem,
    onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ['workoutItem', workoutItem.id],
    });      

    setTimeout(() => {
    }, 2500);
    showPopup('Workout updated successfully!');
    setIsEditMode(false);
    },
    onError: (err) => {
      console.error('Error updating workout:', err);
    },
  });

  const { mutateAsync: deleteWorkout } = useMutation({
    mutationFn: deleteWorkoutItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workouts'] });
      queryClient.invalidateQueries({ queryKey: ['workoutItem', workoutItem.id] });


      setTimeout(() => {
      }, 2500);
      showPopup('Workout deleted successfully!');
      setIsEditMode(false);
    },
    onError: (err) => {
      console.error('Error deleting workout:', err);
    },
  });

  const onSubmit = async (data: WorkoutFormData) => {
      const updatedWorkoutItem = {
        ...workoutItem,
        exercise: data.exercise,
        date: data.date,
        sets: data.sets,
        reps: data.reps
      };

    await editWorkout(updatedWorkoutItem);
    setIsEditMode(false);
  };

  return (
    <View style={[styles.editorContainer, { backgroundColor: Themes[theme].background }]}>      
      <View style={[styles.listItem, { backgroundColor: Themes[theme].primary }]}>  
        <Button 
          title='Delete' 
          buttonStyle={{ backgroundColor: Themes[theme].deleteButton, alignSelf: 'flex-end', marginTop: 10, marginBottom: 6, marginHorizontal: 15 }}
          textStyle={{ color: '#FFFFFF' }}
          onPress={async () => {
            await deleteWorkout(workoutItem.id)
          }}
        />
        <Text style={[styles.title, { color: Themes[theme].defaultText }]}>Edit Training Data</Text>
        <View style={styles.inputRow}>
          <View style={styles.columnRow}>
            <Text style={[styles.label, { color: Themes[theme].defaultText }]}>Exercise</Text>
            <TextInput
              style={[styles.inputField, { color: Themes[theme].defaultText, backgroundColor: Themes[theme].inputField, borderColor: Themes[theme].border }]}
              {...register("exercise")}
              onChangeText={value => {
                setValue("exercise", value)
                clearErrors('exercise')
              }}
              value={watch("exercise")}
            />
            {errors.exercise && <Text style={[styles.inputFieldError, { color: Themes[theme].errorText }]}>{errors.exercise.message}</Text>}
          </View>
          <View style={styles.columnRow}>
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
        <View style={styles.inputRow}>
          <View style={styles.columnRow}>
            <Text style={[styles.label, { color: Themes[theme].defaultText }]}>Sets</Text>
            <NumberDropdown
              value={watch("sets")}
              options={[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]}
              onSelect={(value) => {
                setValue("sets", value);
                clearErrors("sets");
              }}
            />
            {errors.sets && <Text style={[styles.inputFieldError, { color: Themes[theme].errorText }]}>{errors.sets.message}</Text>}
          </View>
          <View style={styles.columnRow}>
            <Text style={[styles.label, { color: Themes[theme].defaultText }]}>Reps</Text>
            <NumberDropdown
              value={watch("reps")}
              options={[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]}
              onSelect={(value) => {
                setValue("reps", value);
                clearErrors("reps");
              }}
            />
            {errors.reps && <Text style={[styles.inputFieldError, { color: Themes[theme].errorText }]}>{errors.reps.message}</Text>}
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            buttonStyle={styles.button}
            title='Save' 
            onPress={handleSubmit(onSubmit)} 
          />
          <Button
            buttonStyle={styles.button}
            title='Cancel' 
            onPress={() => setIsEditMode(false)} 
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  editorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRow: {
    width: '100%', 
    flexDirection: 'row', 
    justifyContent: 'space-evenly', 
    marginBottom: 5
  },
  columnRow: {
    width: "45%"
  },
  inputField: {
    fontSize: 12,
    fontFamily: 'MerriweatherSans',
    width: Dimensions.get('window').width < 440 ? '100%' : 180,
    borderWidth: 1, 
    borderRadius: 3,
    paddingHorizontal: 8,
    paddingVertical: Dimensions.get('window').width < 440 ? 6 : 0,
    ...Platform.select({
      android: {
        lineHeight: 19,
        textAlignVertical: 'center',
      },
      default: {
        height: 30,
      },
    }),
  },
  listItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width < 440 ? '90%' : 400,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 10,
    padding: 6,
  },
  label: {
    fontSize: 13,
    fontFamily: 'MerriweatherSans',
    marginBottom: 2,
    marginTop: 5
  },
  title: {
    fontSize: 18,
    fontWeight: Platform.OS === 'android' || Platform.OS === 'ios' ? '700' : '500',
    fontFamily: 'MerriweatherSans', 
    marginVertical: 12
  },
  inputFieldError: {
    alignSelf: 'flex-start',
    width: '100%',
    fontSize: Dimensions.get('window').width < 440 ? 10 : 13,
    fontFamily: 'MerriweatherSans',
    paddingVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingTop: 3, 
    width: Dimensions.get('window').width < 440 ? '100%' : 400,
    justifyContent: 'space-between',
  },
  button: {
    marginTop: 6, 
    marginBottom: 10, 
    marginHorizontal: 15
  },
})

export default WorkoutEditor;