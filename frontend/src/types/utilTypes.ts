export type SetBoolean = (data: boolean) => void;

export type Theme = 'light' | 'dark'

export interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    refreshTheme: () => Promise<void>
}

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

