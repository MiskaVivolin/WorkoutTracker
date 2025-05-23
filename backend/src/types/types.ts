export interface WorkoutData {
    id: number;
    name: string;
    date: string;
    exercise: string;
    result: string;
    user_id: number;
}

export interface CreateWorkoutData {
    username: string
    name: string;
    date: string;
    exercise: string;
    result: string;
}

export interface UserData {
    body: {
        username: string;
        password: Buffer;
    }
}

export interface ThemeData { 
    username: string; 
    theme: 'light' | 'dark';
}

export interface PostReq {
    body: { 
        workoutItem: WorkoutData;
        username: string;
    }
}

export interface GetReq {
    query: { token: string }
}

export interface GetItemReq {
    params: { id: number };
}

export interface EditReq {
    body: WorkoutData;
}

export interface DeleteReq {
    params: { id: number };
}

export interface GetThemeReq {
    params: { username: string };
}

export interface PostThemeReq {
    body: ThemeData;
}

export interface SignupRes {
    status(arg0: number): SignupRes;
    json: (args: {message: string} | { error: string }) => void;
}

export interface LoginRes {
    status(arg0: number): LoginRes;
    json: (args: {token: string} | { message: string } | { error: string }) => void;
}

export interface PostRes {
    status(arg0: number): PostRes;
    json: (args: string | { error: string }) => void;
}

export interface GetRes {
    status(arg0: number): GetRes;
    json: (args: WorkoutData[] | { error: string }) => void;
}

export interface EditRes {
    status(arg0: number): EditRes;
    json: (args: WorkoutData[] | { error: string }) => void;
}

export interface DeleteRes {
    status(arg0: number): DeleteRes;
    json: (args: WorkoutData[] | { message: string }) => void;
}