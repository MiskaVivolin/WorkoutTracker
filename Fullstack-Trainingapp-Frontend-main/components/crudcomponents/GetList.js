import axios from 'axios'

export default function GetList(setResultlist) {
    axios.get('http://127.0.0.1:3001/get')
    .then((response) =>{
        setResultlist(response.data)
        if(response.data.errorMessage) {
            alert(response.data.errorMessage)
        }
    })
    .catch(() => {
        console.error("Error sending get request")
    })
}
