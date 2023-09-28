import axios, { AxiosResponse } from 'axios'
import React from 'react'
import { SetResultList, DataItem, ResponseData } from 'types/Types'
import GetList from './GetList'

export default function DeletePr(item: DataItem, setResultList: SetResultList ) {

  axios.delete<ResponseData>('http://127.0.0.1:3001/delete', {params: { id: item.id }})
  .then((response: AxiosResponse<ResponseData>) => {
    console.log("item id: ", item.id)
    if(response.data.message.toLowerCase().includes('error')) {
        alert(response.data.message)
      } else {
        console.log(response.data.message)
        GetList(setResultList)
    }
  })
}