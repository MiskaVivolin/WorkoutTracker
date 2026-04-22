import { View, Text, Pressable, StyleSheet } from "react-native";
import { StepperProps } from "../types/componentProps";


export const Stepper = ({ value, onChange, min = 1, max = 100 }: StepperProps) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={() => value > min && onChange(value - 1)}
      >
        <Text style={styles.buttonText}>−</Text>
      </Pressable>
      <Text style={styles.value}>{value}</Text>
      <Pressable
        style={styles.button}
        onPress={() => value < max && onChange(value + 1)}
      >
        <Text style={styles.buttonText}>+</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  button: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  value: {
    fontSize: 18,
    minWidth: 40,
    textAlign: "center",
  },
});