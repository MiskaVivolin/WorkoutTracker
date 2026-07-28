import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, Dimensions, Platform, Pressable, } from 'react-native'
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
import { DatePickerModal } from 'react-native-paper-dates'


const WorkoutEditor = ({ workoutItem, setIsEditMode, showPopup }: WorkoutEditorProps) => {
  
  type WorkoutFormData = z.infer<typeof workoutSchema>
  const queryClient = useQueryClient();
  const workoutSchema = z.object({
    exercise: z.string().min(1, "Exercise required"),
    date: z.date(),
    weight: z.number().min(1, "weight required"),
    reps: z.number().min(1, "Reps required")})
  const { theme } = useTheme();
  const { register, handleSubmit, setValue, watch, clearErrors, formState: { errors }, reset } = useForm<WorkoutFormData>({
      resolver: zodResolver(workoutSchema),
      defaultValues: {
        exercise: workoutItem.exercise,
        date: workoutItem.date,
        weight: workoutItem.weight,
        reps: workoutItem.reps
      }
  })
  const [open, setOpen] = useState(false);
  

  useEffect(() => {
    reset({
      exercise: workoutItem.exercise,
      date: workoutItem.date,
      weight: workoutItem.weight,
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
    showPopup('Workout updated!');
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
      showPopup('Workout deleted!');
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
        weight: data.weight,
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
      <Pressable 
        style={[styles.inputField, { borderColor: Themes[theme].border, backgroundColor: Themes[theme].inputField }]}
        onPress={() => setOpen(true)}>
        <Text style={[styles.label, { color: Themes[theme].defaultText, lineHeight: 19 }]}>
          {watch("date")
            ? watch("date").toISOString().split("T")[0]
            : "Select date"}
        </Text>
      </Pressable>
      <DatePickerModal
        locale="en"
        mode="single"
        visible={open}
        onDismiss={() => setOpen(false)}
        date={watch("date")}
        onConfirm={({ date }) => {
          setOpen(false);

          if (date) {
            setValue("date", date);

            clearErrors("date");
          }
        }}
      />
            {errors.date && <Text style={[styles.inputFieldError, { color: Themes[theme].errorText }]}>{errors.date.message}</Text>}
          </View>
        </View>
        <View style={styles.inputRow}>
          <View style={styles.columnRow}>
            <Text style={[styles.label, { color: Themes[theme].defaultText }]}>Weight in kg</Text>
            <TextInput
              keyboardType="numeric"
              style={[styles.inputField, {color: Themes[theme].defaultText, borderColor: Themes[theme].border, backgroundColor: Themes[theme].inputField, width: 100}]}
              {...register("weight")}
              onChangeText={(value) => {
                const numericValue = value.replace(/[^0-9]/g, "");
                setValue("weight", numericValue === "" ? 0 : Number(numericValue));
                clearErrors('weight')
              }}
              value={watch("weight")?.toString()}
            />
            {errors.weight && <Text style={[styles.inputFieldError, { color: Themes[theme].errorText }]}>{errors.weight.message}</Text>}
          </View>
          <View style={styles.columnRow}>
            <Text style={[styles.label, { color: Themes[theme].defaultText }]}>Reps</Text>
            <TextInput
              keyboardType="numeric"
              style={[styles.inputField, {color: Themes[theme].defaultText, borderColor: Themes[theme].border, backgroundColor: Themes[theme].inputField, width: 100}]}
              {...register("reps")}
              onChangeText={(value) => {
                const numericValue = value.replace(/[^0-9]/g, "");
                setValue("reps", numericValue === "" ? 0 : Number(numericValue));
                clearErrors('reps');
              }}
              value={watch("reps")?.toString()}
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
    marginBottom: 10
  },
  columnRow: {
    width: "45%"
  },
  inputField: {
    fontSize: 15,
    fontFamily: 'Inter18',
    width: Dimensions.get('window').width < 440 ? '100%' : 180,
    borderWidth: 1, 
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: Dimensions.get('window').width < 440 ? 6 : 1,
    ...Platform.select({
      android: {
        lineHeight: 19,
        textAlignVertical: 'center',
      },
      default: {
        height: 32,
      },
    }),
  },
  listItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width < 460 ? '90%' : 440,
    borderRadius: 10,
    padding: 8,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Inter18',
    marginBottom: 2,
    marginTop: 5
  },
  title: {
    fontSize: 24,
    fontWeight: Dimensions.get('window').width < 500 ? '700' : '500',
    fontFamily: 'Inter24', 
    marginVertical: 15
  },
  inputFieldError: {
    alignSelf: 'flex-start',
    width: '100%',
    fontSize: 13,
    fontFamily: 'Inter18',
    paddingVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingTop: 3, 
    width: Dimensions.get('window').width < 440 ? '100%' : 440,
    justifyContent: 'space-between',
    padding: 8,
  },
  button: {
    marginTop: 6, 
    marginBottom: 2, 
    marginHorizontal: 15
  },
})

export default WorkoutEditor;