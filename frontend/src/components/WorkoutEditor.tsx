import React, { useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, Dimensions, Platform, } from 'react-native'
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
    name: z.string().min(1, "Name required"),
    date: z.string().min(1, "Date required"),
    exercise: z.string().min(1, "Exercise required"),
    result: z.string().min(1, "Result required")})

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
  }, [workoutItem, reset]);

  const onSubmit = async (data: WorkoutFormData) => {

    const updatedWorkoutItem = {
      ...workoutItem,
      name: data.name,
      date: data.date,
      exercise: data.exercise,
      result: data.result
    };

    await editWorkoutItem(updatedWorkoutItem)
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
            await deleteWorkoutItem(workoutItem.id, setWorkoutList)
            setIsEditMode(false)
          }}
        />
        <Text style={[styles.header, { color: Themes[theme].defaultText }]}>Edit Training Data</Text>
        <View style={styles.inputRow}>
          <View style={styles.columnRow}>
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
          <View style={styles.columnRow}>
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
        lineHeight: 15,
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
    borderRadius: 8,
    padding: 6,
  },
  label: {
    fontSize: 13,
    fontFamily: 'MerriweatherSans',
    marginBottom: 2,
    marginTop: 5
  },
  header: {
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