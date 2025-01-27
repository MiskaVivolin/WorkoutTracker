import { ReactNode } from 'react'
import { StackNavigationProp } from '@react-navigation/stack';

export interface DataItem {
    readonly _id: number;
    readonly user: string;
    name: string;
    date: string;
    exercise: string;
    result: string;
}

export interface PrFields {
    name: string;
    date: string;
    exercise: string;
    result: string;
}

export interface ResponseData extends DataItem {
    map(arg0: (item: DataItem) => { name: string; date: string; exercise: string; result: string; }): DataItem[];
    message: string;
}

export interface PrListProps {
    resultList: DataItem[]
    setResultList: SetResultList
    setIsEditMode: SetBoolean
    setEditItem: SetEditItem
}

export interface InputContainerProps {
    header: string,
    value: string,
    object: PrFields,
    setObject: any,
    objectIsValid: {
        [key: string]: boolean
    }
}

export interface FormContainerProps {
    prObject: DataItem,
    setPrObject: any,
    prObjectIsValid: {
        [key: string]: boolean
    },
    setPrObjectIsValid: any,
    setResultList: SetResultList,
}

export interface EditItemProps { 
    editItem: DataItem;
    setEditItem: SetEditItem;
    useEditPr: (item: DataItem, setIsEditMode: SetBoolean) => void;
    setIsEditMode: SetBoolean;
    isEditMode: boolean;
    setResultList: SetResultList;
}

export interface NavBarProps {
    showButtons: boolean;
    addButtonToggle?: boolean;
    navigation: StackNavigationProp<RootStackParamList>;
}

export interface PopUpProps {
    setValidationInit: SetBoolean,
    setPressedAdd: SetBoolean;
    prObjectIsValid: {
        [key: string]: boolean
    }
}

export type SetResultList = React.Dispatch<React.SetStateAction<DataItem[]>>;

export type SetEditItem = (data: DataItem) => void

export type SetPrObject = (data: any) => void

export type SetBoolean = (data: boolean) => void 

export interface ContextChildren {
    children: ReactNode;
}

export interface ResultListState {
    resultList: DataItem[];
    setResultList: SetResultList;
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