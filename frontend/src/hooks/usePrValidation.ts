import { PrFields, SetPrObject, SetResultList } from '../types/Types'
import useCreatePr from './useCreatePr'

const usePrValidation = (prObject: PrFields, setPrObjectIsValid: any, setPrList: SetResultList, setPrObject: SetPrObject,): void => {
    if(prObject.name.length === 0) {
        setPrObjectIsValid((prevState: any) => ({ ...prevState, name: false }))
    } else {
        setPrObjectIsValid((prevState: any) => ({ ...prevState, name: true }))
    }
    if(prObject.date.length === 0) {
        setPrObjectIsValid((prevState: any) => ({ ...prevState, date: false }))
    } else {
        setPrObjectIsValid((prevState: any) => ({ ...prevState, date: true }))
    }
    if(prObject.lift.length === 0) {
        setPrObjectIsValid((prevState: any) => ({ ...prevState, lift: false }))
    } else {
        setPrObjectIsValid((prevState: any) => ({ ...prevState, lift: true }))
    }
    if(prObject.result.length === 0) {
        setPrObjectIsValid((prevState: any) => ({ ...prevState, result: false }))
    } else {
        setPrObjectIsValid((prevState: any) => ({ ...prevState, result: true }))
    }
    if(prObject.name.length !== 0 && prObject.date.length !== 0 && prObject.lift.length !== 0 && prObject.result.length !== 0){
        useCreatePr(prObject, setPrList)
        setPrObject({
            name: '',
            date: '',
            lift: '',
            result: ''
        })
    }
}

export default usePrValidation