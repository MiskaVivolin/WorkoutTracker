import { useEffect, useState } from "react";
import { Text, TextInput, StyleSheet, Dimensions, Platform, Keyboard, KeyboardAvoidingView, View } from "react-native";
import { useForm } from "react-hook-form";
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
import NumberDropdown from "./Numberdropdown.tsx";


const AddWorkoutForm = ({workoutItem, setWorkoutItem}: AddWorkoutFormProps) => {
  
  type WorkoutFormData = z.infer<typeof workoutSchema>
  const workoutSchema = z.object({
    exercise: z.string().min(1, "Exercise required"),
    date: z.string().min(1, "Date required"),
    sets: z.number().min(1, "Sets required"),
    reps: z.number().min(1, "Reps required")
  })
  const { theme } = useTheme()
  const { userToken } = useUserToken();
  const { register, handleSubmit, setValue, watch, clearErrors, formState: { errors }, reset } = useForm<WorkoutFormData>({
      resolver: zodResolver(workoutSchema),
      defaultValues: {
          exercise: workoutItem.exercise,
          date: workoutItem.date,
          sets: workoutItem.sets,
          reps: workoutItem.reps
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
      <Text style={[styles.label, {color: Themes[theme].defaultText}]}>Exercise</Text>
      <TextInput
        style={[styles.inputField, {color: Themes[theme].defaultText, borderColor: Themes[theme].border, backgroundColor: Themes[theme].inputField}]}
        {...register("exercise")}
        onChangeText={(value) => {
          setValue("exercise", value)
          setWorkoutItem({ ...workoutItem, exercise: value })
          clearErrors('exercise')
        }}
        value={watch("exercise")}
        />
      {errors.exercise && <Text style={[styles.errorText, {color: Themes[theme].errorText}]}>{errors.exercise.message}</Text>}

      <Text style={[styles.label, {color: Themes[theme].defaultText}]}>Date</Text>
      <TextInput
        style={[styles.inputField, {color: Themes[theme].defaultText, borderColor: Themes[theme].border, backgroundColor: Themes[theme].inputField}]}
        {...register("date")}
        onChangeText={(value) => {
          setValue("date", value)
          setWorkoutItem({ ...workoutItem, date: value })
          clearErrors('date')
        }}
        value={watch("date")}
      />
      {errors.date && <Text style={[styles.errorText, {color: Themes[theme].errorText}]}>{errors.date.message}</Text>}

      <View style={styles.labelContainer}>
        <Text style={[styles.label, {color: Themes[theme].defaultText}]}>Sets</Text>
        <Text style={[styles.label, {color: Themes[theme].defaultText}]}>Reps</Text>
      </View>

      <View style={styles.labelContainer}>
        <NumberDropdown
          value={watch("sets")}
          options={[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]}
          onSelect={(value) => {
            setValue("sets", value);
            setWorkoutItem({ ...workoutItem, sets: value });
            clearErrors("sets");
          }}
        />
        {errors.sets && <Text>{errors.sets.message}</Text>}
        {errors.sets && <Text style={[styles.errorText, {color: Themes[theme].errorText}]}>{errors.sets.message}</Text>}

        <NumberDropdown
          value={watch("reps")}
          options={[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]}
          onSelect={(value) => {
            setValue("reps", value);
            setWorkoutItem({ ...workoutItem, reps: value });
            clearErrors("reps");
          }}
        />
        {errors.reps && <Text style={[styles.errorText, {color: Themes[theme].errorText}]}>{errors.reps.message}</Text>}
      </View>

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
  labelContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between'
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