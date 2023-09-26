import axios from "axios"
import { AxiosResponse } from 'axios'
import { DataItem, ResponseData } from "../../types/types"

export default function CreatePr(name: string, date: string, lift: string, result: string) {
    const newResult = {
        name: name,
        date: date,
        lift: lift,
        result: result
    }
    axios.post<ResponseData>('http://127.0.0.1:3001/create', newResult)
    .then((response: AxiosResponse<ResponseData>) => {
        const { data, successMessage, errorMessage } = response.data
        if(data) {
            console.log(successMessage)
        }
        else{
            alert(errorMessage);
        }
    })
    .catch(err => {
        console.error("Error sending post request", err)
    })
}