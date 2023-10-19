import axios, { AxiosResponse } from 'axios'
import { DataItem, ResponseData, SetBoolean } from 'types/Types'

const useEditPr = (prObject: DataItem, setIsEditMode: SetBoolean): void => {

  axios.put<ResponseData>(`http://127.0.0.1:3001/put/${prObject._id}`, prObject)
  .then((response: AxiosResponse<ResponseData>) => {
    if(response.data.message.toLowerCase().includes('error')) {
      alert(response.data.message)
    } else {
        setIsEditMode(false)
        console.log(response.data.message)
    }
  })
}

export default useEditPr;