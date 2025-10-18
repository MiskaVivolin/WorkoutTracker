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

export interface ResponseData{
    message: string;
    json: WorkoutItem[];
}

export type SetWorkoutList = React.Dispatch<React.SetStateAction<WorkoutItem[]>>;

export type SetWorkoutItem = (data: WorkoutItem) => void;

export type SetExercise = (data: String) => void;