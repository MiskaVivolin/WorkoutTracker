import { PrevStateBooleanObj, SetBoolean, SetWorkoutItem, SetWorkoutList, WorkoutItem, WorkoutItemValidationProps } from '../types/Types'
import CreateWorkoutItem from './CreateWorkoutItem'
import EditWorkoutItem from './EditWorkoutItem'

const WorkoutItemValidation = ({workoutItem, setWorkoutItem, setWorkoutItemFieldIsValid, setWorkoutList, pressedAdd, setPressedAdd, isEditMode, setIsEditMode, userToken}: WorkoutItemValidationProps): void => {

    if(workoutItem.name.length === 0) {
        setWorkoutItemFieldIsValid((prevState: PrevStateBooleanObj) => ({ ...prevState, name: false }))
        setPressedAdd(false)
    } else {
        setWorkoutItemFieldIsValid((prevState: PrevStateBooleanObj) => ({ ...prevState, name: true }))
    }
    if(workoutItem.date.length === 0) {
        setWorkoutItemFieldIsValid((prevState: PrevStateBooleanObj) => ({ ...prevState, date: false }))
        setPressedAdd(false)
    } else {
        setWorkoutItemFieldIsValid((prevState: PrevStateBooleanObj) => ({ ...prevState, date: true }))
    }
    if(workoutItem.exercise.length === 0) {
        setWorkoutItemFieldIsValid((prevState: PrevStateBooleanObj) => ({ ...prevState, exercise: false }))
        setPressedAdd(false)
    } else {
        setWorkoutItemFieldIsValid((prevState: PrevStateBooleanObj) => ({ ...prevState, exercise: true }))
    }
    if(workoutItem.result.length === 0) {
        setWorkoutItemFieldIsValid((prevState: PrevStateBooleanObj) => ({ ...prevState, result: false }))
        setPressedAdd(false)
    } else {
        setWorkoutItemFieldIsValid((prevState: PrevStateBooleanObj) => ({ ...prevState, result: true }))
    }
    if(workoutItem.name.length !== 0 && workoutItem.date.length !== 0 && workoutItem.exercise.length !== 0 && workoutItem.result.length !== 0){
        if(pressedAdd && !isEditMode) {
            CreateWorkoutItem(workoutItem, setWorkoutList, userToken)
            setPressedAdd(false)
            setWorkoutItem({
                _id: 0,
                user: '',
                name: '',
                date: '',
                exercise: '',
                result: ''
            })
        }
        if(pressedAdd && isEditMode) {
            EditWorkoutItem(workoutItem, setIsEditMode)
        }
    }
}

export default WorkoutItemValidation;