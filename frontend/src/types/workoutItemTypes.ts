export interface WorkoutItem {
    readonly id: number;
    exercise: string;
    date: string;
    sets: number;
    reps: number;
}

export interface WorkoutItemFields {
    exercise: string;
    date: string;
    sets: number;
    reps: number;
}

export interface ResponseData{
    message: string;
    json: WorkoutItem[];
}

export type SetWorkoutList = React.Dispatch<React.SetStateAction<WorkoutItem[]>>;

export type SetWorkoutItem = (data: WorkoutItem) => void;

export type SetExercise = (data: String) => void;