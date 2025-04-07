import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./utilTypes";

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

// export type AddExerciseScreenParams = {
//     username: string;
// }

// export type WorkoutListScreenParams = {
//     username: string;
// }