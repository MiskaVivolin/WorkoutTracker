import axios from 'axios'
import { AxiosResponse } from 'axios'
import { SetResultList, ResponseData, DataItem } from '../../types/Types'


export default function GetList(setResultlist: SetResultList) {
    axios.get<ResponseData>('http://127.0.0.1:3001/get')
    .then((response: AxiosResponse<ResponseData>) =>{
        console.log("Response data: ", response)
        const {data} = response
        console.log(data)
        
        const dataItems: DataItem[] = data.map((item) => ({
            name: item.name,
            date: item.date,
            lift: item.lift,
            result: item.result
        }))

            console.log('API Success:');
            console.log(dataItems)
            setResultlist(dataItems)
        
    })
    .catch(() => {
        console.error("Error sending get request")
    })
}
