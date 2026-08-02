import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList, SetBoolean } from "./utilTypes";
import { SetWorkoutItem, SetWorkoutList, WorkoutItem } from "./workoutItemTypes";
import { TextStyle, ViewStyle } from "react-native";
import { Dispatch, SetStateAction } from "react";

export interface WorkoutEditorProps { 
    workoutItem: WorkoutItem;
    setIsEditMode: SetBoolean;
    showPopup: (message: string) => void;
}

export interface AddWorkoutFormProps {
    workoutItem: WorkoutItem; 
    setWorkoutItem: SetWorkoutItem;
}

export interface NavBarProps {
    navigation: StackNavigationProp<RootStackParamList>;
}

export interface TabBarProps {
    navigation: StackNavigationProp<RootStackParamList>;
}

export interface PopUpProps {
    popupVisible: boolean;
    message: string;
}

export interface WorkoutListProps {
    setIsEditMode: SetBoolean;
    setWorkoutItem: SetWorkoutItem;
    popupVisible: boolean;
    popupMessage: string;
}

export interface ButtonProps {
    title: string;
    onPress: () => void;
    buttonStyle?: ViewStyle;
    textStyle?: TextStyle;
    disabled?: boolean;
  };

export interface NavButtonProps {
    title: string;
    onPress: () => void;
    style?: ViewStyle;
    isActive?: boolean;
  };

export interface LogoProps {
    viewStyle?: ViewStyle;
} 

export interface LoginContainerProps {
    navigation: StackNavigationProp<RootStackParamList>;
}

export interface SignupContainerProps {
    navigation: StackNavigationProp<RootStackParamList>;
}

export interface ConfirmModalProps {
  setModalVisible: SetBoolean;
  navigation: StackNavigationProp<RootStackParamList>;
};

export interface SortDropdownProps {
  options: { label: string; value: string }[];
  onSelect: (value: string) => void;
};

export interface SearchBarProps {
  value: string;
  onChange: (text: string) => void;
};

export interface NumberDropdownProps {
  value: number;
  onSelect: (value: number) => void;
  options: number[];
  customStyle?: string;
};

export interface ExerciseNavigationProps {
  setExercise: Dispatch<SetStateAction<string>>;
}