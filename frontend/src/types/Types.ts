import { ReactNode } from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import { ViewStyle } from 'react-native';

export interface WorkoutItem {
    readonly id: number;
    name: string;
    date: string;
    exercise: string;
    result: string;
}

export interface WorkoutItemFields {
    name: string;
    date: string;
    exercise: string;
    result: string;
}

export interface ResponseData extends WorkoutItem {
    map(arg0: (item: WorkoutItem) => { name: string; date: string; exercise: string; result: string; }): WorkoutItem[];
    message: string;
}

export type SetWorkoutList = React.Dispatch<React.SetStateAction<WorkoutItem[]>>;

export type SetWorkoutItem = (data: WorkoutItem) => void;

export type SetBoolean = (data: boolean) => void;

export interface ContextChildren {
    children: ReactNode;
}

export interface WorkoutListState {
    workoutList: WorkoutItem[];
    setWorkoutList: SetWorkoutList;
}

export interface ValidationFields {
    username: string;
    password: string;
};

export type RootStackParamList = {
    AddWorkoutScreen: undefined;
    LoginScreen: undefined;
    SignupScreen: undefined;
    WorkoutListScreen: undefined;
};

export interface ApiResponse {
    message: string;
}

export interface PrevStateBooleanObj {
    name: boolean;
    date: boolean;
    exercise: boolean;
    result: boolean;
}

export type User = {
    username: string;
}

export type AddExerciseScreenParams = {
    username: string;
}

export type WorkoutListScreenParams = {
    username: string;
}

// screen props

export type AddWorkoutScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'AddWorkoutScreen'>;
};

export type LoginScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'LoginScreen'>;
};

export type SignupScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'SignupScreen'>;
};

export type WorkoutListScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'WorkoutListScreen'>;
};

// component props

export interface WorkoutEditorProps { 
    workoutItem: WorkoutItem;
    setWorkoutItem: SetWorkoutItem;
    setIsEditMode: SetBoolean;
    isEditMode: boolean;
    setWorkoutList: SetWorkoutList;
}

export interface FormContainerProps {
    workoutItem: WorkoutItem;
    setWorkoutItem: SetWorkoutItem;
    workoutItemFieldIsValid: {
        [key: string]: boolean
    };
    setWorkoutItemFieldIsValid: React.Dispatch<React.SetStateAction<PrevStateBooleanObj>>;
    setWorkoutList: SetWorkoutList;
}

export interface NavBarProps {
    showButtons: boolean;
    addButtonToggle?: boolean;
    navigation: StackNavigationProp<RootStackParamList>;
}

export interface PopUpProps {
    setValidationInit: SetBoolean;
    setPressedAdd: SetBoolean;
    workoutItemFieldIsValid: {
        [key: string]: boolean;
    }
    setWorkoutItemFieldIsValid: React.Dispatch<React.SetStateAction<PrevStateBooleanObj>>;

}

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

// function props

export type AuthenticationValidationProps = {
    navigation: StackNavigationProp<RootStackParamList>;
    mode: string;
    setValidationInit: (data: boolean) => void;
    validationFields: ValidationFields;
    setValidationErrors: React.Dispatch<React.SetStateAction<ValidationFields>>;
    setValidationFields: (data: ValidationFields) => void;
    setValidUsername?: (data: boolean) => void;
    setValidPassword?: (data: boolean) => void;
    isFirstRender?: boolean;
}

export type WorkoutItemValidationProps = {
    workoutItem: WorkoutItem;
    setWorkoutItem: SetWorkoutItem;
    setWorkoutItemFieldIsValid: React.Dispatch<React.SetStateAction<PrevStateBooleanObj>>;
    setWorkoutList: SetWorkoutList;
    pressedAdd: boolean;
    setPressedAdd: SetBoolean;
    isEditMode: boolean;
    setIsEditMode: (data: boolean) => void;
    setValidationInit?: (data: boolean) => void;
    setConfirmFalseValidation?: (data: boolean) => void;
    userToken: string | null;
}