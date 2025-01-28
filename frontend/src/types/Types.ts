import { ReactNode } from 'react'
import { StackNavigationProp } from '@react-navigation/stack';

export interface WorkoutItem {
    readonly _id: number;
    readonly user: string;
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

export interface WorkoutListProps {
    workoutList: WorkoutItem[];
    setWorkoutList: SetWorkoutList;
    setIsEditMode: SetBoolean;
    setEditWorkoutItem: SetEditWorkoutItem;
}

export interface InputContainerProps {
    header: string,
    value: string,
    workoutItem: WorkoutItemFields,
    setItem: any,
    workoutItemIsValid: {
        [key: string]: boolean
    }
}

export interface FormContainerProps {
    workoutItem: WorkoutItem,
    setWorkoutItem: any,
    workoutItemIsValid: {
        [key: string]: boolean
    },
    setWorkoutItemIsValid: any,
    setWorkoutList: SetWorkoutList,
}

export interface EditWorkoutItemProps { 
    editWorkoutItem: WorkoutItem;
    setEditWorkoutItem: SetEditWorkoutItem;
    useEditPr: (item: WorkoutItem, setIsEditMode: SetBoolean) => void;
    setIsEditMode: SetBoolean;
    isEditMode: boolean;
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
    workoutItemIsValid: {
        [key: string]: boolean;
    }
}

export type SetWorkoutList = React.Dispatch<React.SetStateAction<WorkoutItem[]>>;

export type SetEditWorkoutItem = (data: WorkoutItem) => void

export type SetWorkoutItem = (data: any) => void

export type SetBoolean = (data: boolean) => void 

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
  
export interface ValidationHookResult {
    validationFields: ValidationFields;
    validationErrors: ValidationFields;
    usernameIsValid: () => boolean;
    passwordIsValid: () => boolean;
    setValidationFields: React.Dispatch<React.SetStateAction<ValidationFields>>;
    setValidationErrors: React.Dispatch<React.SetStateAction<ValidationFields>>;
};

export type RootStackParamList = {
    AddExerciseScreen: undefined;
    LoginScreen: undefined;
    SignupScreen: undefined;
    ResultScreen: undefined;
};
  
export type AddExerciseScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'AddExerciseScreen'>;
};

export type ResultScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'AddExerciseScreen'>;
};

export type LoginScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'LoginScreen'>;
};

export type SignupScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'SignupScreen'>;
};

export interface ApiResponse {
    message: string;
}

export interface PrevStateBooleanObj {
    name: boolean,
    date: boolean,
    exercise: boolean,
    result: boolean
}

export type User = {
    username: string;
}

export type AddExerciseScreenParams = {
    username: string;
}

export type ResultScreenParams = {
    username: string;
}

export type AuthenticationProps = {
    navigation: StackNavigationProp<RootStackParamList>, 
    mode: string, 
    setValidationInit: (data: boolean) => void, 
    validationFields: ValidationFields, 
    setValidationErrors: React.Dispatch<React.SetStateAction<ValidationFields>>, 
    setValidationFields: (data: ValidationFields) => void, 
    setValidUsername?: (data: boolean) => void, 
    setValidPassword?: (data: boolean) => void, 
    isFirstRender?: boolean
}