import { ReactNode } from 'react'

export type SetBoolean = (data: boolean) => void;

export type UserTokenContextType = {
  userToken: string | null;
  setToken: (token: string | null) => void;
};

export interface ValidationFields {
    username: string;
    password: string;
};

export type RootStackParamList = {
    AddWorkoutScreen: undefined;
    LoginScreen: undefined;
    SignupScreen: undefined;
    WorkoutListScreen: undefined;
    SettingScreen: undefined;
};

export interface ApiResponse {
    message: string;
}

export interface UserLogin {
    Promise: any
}

