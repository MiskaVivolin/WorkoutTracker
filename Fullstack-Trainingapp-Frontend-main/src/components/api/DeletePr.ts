// import axios from 'axios'
// import { AxiosResponse } from 'axios'
// import GetList from './GetList'
// import { SetResultList, DataItem, ResponseData } from '../../types/types'

// export default function DeletePr(item: DataItem, setResultList: SetResultList) {
//     axios.delete<ResponseData>(`http://127.0.0.1:3001/delete`, { params: {id: item._id} })
//     .then((response: AxiosResponse<ResponseData>) => {
//         const {data, successMessage, errorMessage} = response.data
//         if(data) {
//             GetList(setResultList);
//             console.log(successMessage)
//         }
//         else {
//             alert(errorMessage)
//         }
//     })
//     .catch(err => {
//         console.error("Error sending delete request", err)
//     })
// }