import axios from 'axios'
import { AxiosResponse } from 'axios'
import { SetResultList, ResponseData } from '../../types/types'

export default function GetList(setResultlist: SetResultList) {
    axios.get<ResponseData>('http://127.0.0.1:3001/get')
    .then((response: AxiosResponse<ResponseData>) =>{
        const {data, errorMessage} = response.data
        if(errorMessage) {
            console.error('API Error:', errorMessage);
            alert(errorMessage)
        } else {
            console.log('API Success:');
            setResultlist(data)
        }
    })
    .catch(() => {
        console.error("Error sending get request")
    })
}
