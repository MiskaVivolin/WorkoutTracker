import axios, { AxiosResponse } from 'axios'
import { ResponseData, SetEditItem } from '../types/Types'

const useGetItem = (id: number, setEditItem: SetEditItem): void => {

  axios.get<ResponseData>(`http://127.0.0.1:3001/get/${id}`)
  .then((response: AxiosResponse<ResponseData>) => {
    if(response.data.message) {
      alert(response.data.message)
    } else {
      setEditItem(response.data)
    }
  })
  .catch((error) => {
    console.error('Error sending get request:', error);
  });
}

export default useGetItem;