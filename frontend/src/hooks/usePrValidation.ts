import { PrFields, SetBoolean, SetPrObject, SetResultList } from '../types/Types'
import useCreatePr from './useCreatePr'

const usePrValidation = (prObject: PrFields, setPrObjectIsValid: any, setPrList: SetResultList, setPrObject: SetPrObject, pressedAdd: boolean, setPressedAdd: SetBoolean): void => {

    if(prObject.name.length === 0) {
        setPrObjectIsValid((prevState: any) => ({ ...prevState, name: false }))
        setPressedAdd(false)
    } else {
        setPrObjectIsValid((prevState: any) => ({ ...prevState, name: true }))
    }
    if(prObject.date.length === 0) {
        setPrObjectIsValid((prevState: any) => ({ ...prevState, date: false }))
        setPressedAdd(false)
    } else {
        setPrObjectIsValid((prevState: any) => ({ ...prevState, date: true }))
    }
    if(prObject.lift.length === 0) {
        setPrObjectIsValid((prevState: any) => ({ ...prevState, lift: false }))
        setPressedAdd(false)
    } else {
        setPrObjectIsValid((prevState: any) => ({ ...prevState, lift: true }))
    }
    if(prObject.result.length === 0) {
        setPrObjectIsValid((prevState: any) => ({ ...prevState, result: false }))
        setPressedAdd(false)
    } else {
        setPrObjectIsValid((prevState: any) => ({ ...prevState, result: true }))
    }
    if(prObject.name.length !== 0 && prObject.date.length !== 0 && prObject.lift.length !== 0 && prObject.result.length !== 0){
        if(pressedAdd) {
            useCreatePr(prObject, setPrList)
            setPressedAdd(false)
            setPrObject({
                name: '',
                date: '',
                lift: '',
                result: ''
            })
        }
    }
}

export default usePrValidation