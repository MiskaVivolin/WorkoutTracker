import axios from 'axios'
import GetList from './GetList'

export default function DeletePr(item, setResultList) {
    axios.delete(`http://127.0.0.1:3001/delete`, { params: {id: item._id} })
    .then(response => {
        if(response.data.successMessage) {
            console.log(response.data.successMessage)
        }
        else if(response.data.errorMessage) {
            alert(response.data.errorMessage)
        }
        GetList(setResultList);
    })
    .catch(err => {
        console.error("Error sending delete request", err)
    })
}