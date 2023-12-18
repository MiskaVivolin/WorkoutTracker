import axios, { AxiosResponse } from "axios";
import { SetResultList, PrFields, ResponseData } from "../types/Types";
import useGetList from "./useGetList";

const useCreatePr = (prObject: PrFields, setResultList: SetResultList): void => {

  axios.post<ResponseData>('http://127.0.0.1:3001/create', prObject)
  .then((response: AxiosResponse<ResponseData>) => {
    useGetList(setResultList)
    if (response.data.message.toLowerCase().includes("error")){
      alert(response.data.message)
    } else {
      console.log(response.data.message)
    }
  })
}

export default useCreatePr;