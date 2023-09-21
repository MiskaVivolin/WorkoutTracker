import axios from "axios"
import GetList from "./GetList"

export default function CreatePr(name, date, lift, result) {
    const newResult = {
        name: name,
        date: date,
        lift: lift,
        result: result
    }
    axios.post('http://127.0.0.1:3001/create', newResult)
    .then(response => {
        if(response.data.successMessage) {
            console.log(response.data.successMessage)
        }
        else if(response.data.errorMessage) {
            alert(response.data.errorMessage);
        }
    })
    .catch(err => {
        console.error("Error sending post request", err)
    })
}