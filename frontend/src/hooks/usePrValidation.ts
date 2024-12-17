import { DataItem, PrevStateBooleanObj, SetBoolean, SetPrObject, SetResultList } from '../types/Types'
import useCreatePr from './useCreatePr'
import useEditPr from './useEditPr'

const usePrValidation = (prObject: DataItem, setPrObjectIsValid: React.Dispatch<React.SetStateAction<PrevStateBooleanObj>>, setResultList: SetResultList, setPrObject: SetPrObject, pressedAdd: boolean, setPressedAdd: SetBoolean, isEditMode: boolean, setIsEditMode: (data: boolean) => void, username: string | null): void => {


    if(prObject.name.length === 0) {
        setPrObjectIsValid((prevState: PrevStateBooleanObj) => ({ ...prevState, name: false }))
        setPressedAdd(false)
    } else {
        setPrObjectIsValid((prevState: PrevStateBooleanObj) => ({ ...prevState, name: true }))
    }
    if(prObject.date.length === 0) {
        setPrObjectIsValid((prevState: PrevStateBooleanObj) => ({ ...prevState, date: false }))
        setPressedAdd(false)
    } else {
        setPrObjectIsValid((prevState: PrevStateBooleanObj) => ({ ...prevState, date: true }))
    }
    if(prObject.exercise.length === 0) {
        setPrObjectIsValid((prevState: PrevStateBooleanObj) => ({ ...prevState, exercise: false }))
        setPressedAdd(false)
    } else {
        setPrObjectIsValid((prevState: PrevStateBooleanObj) => ({ ...prevState, exercise: true }))
    }
    if(prObject.result.length === 0) {
        setPrObjectIsValid((prevState: PrevStateBooleanObj) => ({ ...prevState, result: false }))
        setPressedAdd(false)
    } else {
        setPrObjectIsValid((prevState: PrevStateBooleanObj) => ({ ...prevState, result: true }))
    }
    if(prObject.name.length !== 0 && prObject.date.length !== 0 && prObject.exercise.length !== 0 && prObject.result.length !== 0){
        if(pressedAdd && !isEditMode) {
            useCreatePr(prObject, setResultList, username)
            setPressedAdd(false)
            setPrObject({
                name: '',
                date: '',
                exercise: '',
                result: ''
            })
        }
        if(pressedAdd && isEditMode) {
            useEditPr(prObject, setIsEditMode)
        }
    }
}

export default usePrValidation