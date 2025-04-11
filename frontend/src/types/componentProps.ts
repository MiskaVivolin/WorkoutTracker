import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList, SetBoolean } from "./utilTypes";
import { SetWorkoutItem, SetWorkoutList, WorkoutItem } from "./workoutItemTypes";
import { ViewStyle } from "react-native";

export interface WorkoutEditorProps { 
    workoutItem: WorkoutItem;
    setIsEditMode: SetBoolean;
    setWorkoutList: SetWorkoutList;
}

export interface FormContainerBetaProps {
    workoutItem: WorkoutItem; 
    setWorkoutItem: SetWorkoutItem;
}

export interface NavBarProps {
    showButtons: boolean;
    addButtonToggle?: boolean;
    navigation: StackNavigationProp<RootStackParamList>;
    currentScreen?: string;
}

// export interface PopUpProps {
//     setValidationInit: SetBoolean;
//     setPressedAdd: SetBoolean;
//     workoutItemFieldIsValid: {
//         [key: string]: boolean;
//     }
//     setWorkoutItemFieldIsValid: React.Dispatch<React.SetStateAction<PrevStateBooleanObj>>;
// }

export interface WorkoutListProps {
    workoutList: WorkoutItem[];
    setWorkoutList: SetWorkoutList;
    setIsEditMode: SetBoolean;
    setWorkoutItem: SetWorkoutItem;
}

export interface ButtonProps {
    title: string;
    onPress: () => void;
    style?: ViewStyle;
  };

export interface NavButtonProps {
    title: string;
    onPress: () => void;
    style?: ViewStyle;
    isActive?: boolean;
  };

export interface LoginContainerProps {
    navigation: StackNavigationProp<RootStackParamList>;
}

export interface SignupContainerProps {
    navigation: StackNavigationProp<RootStackParamList>;
}