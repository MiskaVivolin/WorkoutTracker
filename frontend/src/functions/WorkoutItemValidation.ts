import { PrevStateBooleanObj, WorkoutItemValidationProps } from '../types/Types'
import createWorkoutItem from './createWorkoutItem'
import editWorkoutItem from './editWorkoutItem'

const workoutItemValidation = ({workoutItem, setWorkoutItem, setWorkoutItemFieldIsValid, setWorkoutList, pressedAdd, setPressedAdd, isEditMode, setIsEditMode, setValidationInit, setConfirmFalseValidation, userToken}: WorkoutItemValidationProps) => {


    if(setConfirmFalseValidation) {
        setConfirmFalseValidation(true)
    }
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
            createWorkoutItem(workoutItem, setWorkoutList, userToken)
            setWorkoutItem({
                id: 0,
                name: '',
                date: '',
                exercise: '',
                result: ''
            })
            if(setConfirmFalseValidation) {
            setConfirmFalseValidation(false)
            }
            if(setValidationInit) {
                setValidationInit(false)
            }
        }
        if(pressedAdd && isEditMode) {
            editWorkoutItem(workoutItem, setIsEditMode)
        }
    }
}

export default workoutItemValidation;