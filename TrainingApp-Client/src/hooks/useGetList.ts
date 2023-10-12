import axios, { AxiosResponse } from 'axios'
import { SetResultList, ResponseData, DataItem } from '../types/Types'

const useGetList = (setResultList: SetResultList): void => {
    axios.get('http://127.0.0.1:3001/get')
        .then((response: AxiosResponse<ResponseData>) => {
            const {data} = response;
            const dataItems: DataItem[] = data.map((item) => ({
                _id: item._id,
                name: item.name,
                date: item.date,
                lift: item.lift,
                result: item.result
            }))

            console.log('API Success:');
            console.log(dataItems)
            console.log(response.data.message)
            setResultList(dataItems)
        })
        .catch(() => {
            console.error("Error sending get request")
        })
}

export default useGetList;