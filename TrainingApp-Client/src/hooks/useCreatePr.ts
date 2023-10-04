import axios, { AxiosResponse } from "axios";
import { ResponseData, SetResultList } from "../types/Types";
import useGetList from "./useGetList";

const useCreatePr = (name: string, date: string, lift: string, result: string, setResultList: SetResultList) => {

    const newPr = {
        name: name,
        date: date,
        lift: lift,
        result: result
    }

    axios.post<ResponseData>('http://127.0.0.1:3001/create', newPr)
    .then((response: AxiosResponse<ResponseData>) => {
            console.log("NewPr", newPr)
            console.log(response.data)
            useGetList(setResultList)
            if (response.data.message.toLowerCase().includes("error")){
                alert(response.data.message)
            } else {
                console.log(response.data.message)
            }
        })
}

export default useCreatePr;