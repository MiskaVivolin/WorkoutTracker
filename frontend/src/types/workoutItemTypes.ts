import { workoutSchema } from "../schemas/workoutSchema";
import { z } from "zod";

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

export interface WorkoutListState {
    workoutList: WorkoutItem[];
    setWorkoutList: SetWorkoutList;
}

export type WorkoutFormData = z.infer<typeof workoutSchema>