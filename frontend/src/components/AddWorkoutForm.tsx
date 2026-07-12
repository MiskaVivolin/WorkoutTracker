import { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, Dimensions, Platform, Keyboard, KeyboardAvoidingView } from "react-native";
import { DatePickerModal } from 'react-native-paper-dates';
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


const AddWorkoutForm = ({workoutItem, setWorkoutItem}: AddWorkoutFormProps) => {
  
  const workoutSchema = z.object({
    exercise: z.string().min(1, "Exercise required"),
    date: z.date(),
    weight: z.coerce.number().min(1, "Weight required"),
    reps: z.coerce.number().min(1, "Reps required")
  })
  const { theme } = useTheme()
  const { userToken } = useUserToken();
  const { register, handleSubmit, setValue, watch, clearErrors, formState: { errors }, reset } = useForm<z.input<typeof workoutSchema>,any,z.output<typeof workoutSchema>>
  ({
    resolver: zodResolver(workoutSchema),
    defaultValues: {
      exercise: workoutItem.exercise,
      date: workoutItem.date || new Date(),
      weight: workoutItem.weight,
      reps: workoutItem.reps
    }
  })
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
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
      <Text style={[styles.label, { color: Themes[theme].defaultText }]}>Exercise</Text>
      <TextInput
        style={[styles.inputField, { color: Themes[theme].defaultText, borderColor: Themes[theme].border, backgroundColor: Themes[theme].inputField }]}
        {...register("exercise")}
        onChangeText={(value) => {
          setValue("exercise", value)
          setWorkoutItem({ ...workoutItem, exercise: value })
          clearErrors('exercise')
        }}
        value={watch("exercise")}
        />
      {errors.exercise && <Text style={[ styles.errorText, {color: Themes[theme].errorText }]}>{errors.exercise.message}</Text>}

      <Text style={[styles.label, { color: Themes[theme].defaultText }]}>Date</Text>
      <Pressable 
        onPress={() => setOpen(true)}
        style={[styles.inputField, { borderColor: Themes[theme].border, backgroundColor: Themes[theme].inputField }]}>
        <Text style={[styles.label, { color: Themes[theme].defaultText, lineHeight: 12 }]}>
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

            setWorkoutItem({
              ...workoutItem,
              date,
            });

            clearErrors("date");
          }
        }}
      />


      {errors.date && <Text style={[styles.errorText, {color: Themes[theme].errorText}]}>{errors.date.message}</Text>}

      <View style={styles.labelContainer}>

        <View style={styles.columnRow}>
          <Text style={[styles.label, {color: Themes[theme].defaultText}]}>Weight in kg</Text>
          <TextInput
            keyboardType="numeric"
            style={[styles.inputField, {color: Themes[theme].defaultText, borderColor: Themes[theme].border, backgroundColor: Themes[theme].inputField, width: 100}]}
            {...register("weight")}
            onChangeText={(value) => {
              const numericValue = value.replace(/[^0-9]/g, "");
              setValue("weight", numericValue === "" ? 0 : Number(numericValue));
              setWorkoutItem({ ...workoutItem, weight: Number(numericValue) });
              clearErrors('weight')
            }}
            value={watch("weight")?.toString()}
          />
          {errors.weight && <Text style={[styles.errorText, {color: Themes[theme].errorText}]}>{errors.weight.message}</Text>}
        </View>
        
        <View style={styles.columnRow}>
          <Text style={[styles.label, {color: Themes[theme].defaultText}]}>Reps</Text>
          <TextInput
            keyboardType="numeric"
            style={[styles.inputField, {color: Themes[theme].defaultText, borderColor: Themes[theme].border, backgroundColor: Themes[theme].inputField, width: 100}]}
            {...register("reps")}
            onChangeText={(value) => {
              const numericValue = value.replace(/[^0-9]/g, "");
              setValue("reps", numericValue === "" ? 0 : Number(numericValue));
              setWorkoutItem({ ...workoutItem, reps: Number(numericValue) });
              clearErrors('reps');
            }}
            value={watch("reps")?.toString()}
          />
          {errors.reps && <Text style={[styles.errorText, {color: Themes[theme].errorText}]}>{errors.reps.message}</Text>}
        </View>
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
    width: Dimensions.get('window').width < 500 ? '80%' : 350,

  },
  label: {
    alignSelf: "flex-start",
    width: Dimensions.get('window').width < 500 ? '100%' : 350,
    fontSize: 13,
    fontFamily: 'Inter18',
    marginBottom: 2,
    marginTop: 12
  },
  labelContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 22,
    fontWeight: Dimensions.get('window').width < 500 ? '700' : '500', 
    fontFamily: 'Inter18', 
    marginBottom: Dimensions.get('window').height < 1000 ? 30 : 50, 
  },
  inputField: {
    fontFamily: 'Inter18',
    fontSize: 13,
    width: Dimensions.get('window').width < 500 ? '100%' : 350,
    height: 35,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: Dimensions.get('window').width < 500 ? 6 : 12,
    paddingHorizontal: 8,
    ...Platform.select({
      android: {
        paddingBottom: 8,
        lineHeight: 15,
      },
    }),
  },
  columnRow: {
    width: "45%"
  },
  errorText: {
    fontSize: 13,
    fontFamily: 'Inter18', 
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
    fontFamily: "Inter18",
  },
});

export default AddWorkoutForm