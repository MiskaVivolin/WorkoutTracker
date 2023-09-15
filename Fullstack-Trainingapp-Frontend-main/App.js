import React from 'react';
import { useEffect } from 'react';
import axios from "axios";
import { StyleSheet, TextInput, Button, View, Text, FlatList } from 'react-native';


export default function App() {

  const [name, setName] = React.useState('')
  const [date, setDate] = React.useState('')
  const [lift, setLift] = React.useState('')
  const [result, setResult] = React.useState('')
  const [resultlist, setResultlist] = React.useState([])

  useEffect(() => {
    getList()
  },[])

  const getList = () => {
    axios.get('http://127.0.0.1:3001/get')
      .then((response) =>{
        setResultlist(response.data)
      })
      .catch(() => {
        alert("error retrieving data")
      })
  }

  const createResult = (event) =>{
    event.preventDefault()
    const newResult = {
      name: name,
      date: date,
      lift: lift,
      result: result
    }
    axios.post('http://127.0.0.1:3001/create', newResult)
  }

  const deleteItem = (item) => {
    axios.delete(`http://127.0.0.1:3001/delete`, { params:
  {id: 1} })
    // axios.delete('http://127.0.0.1:3001/delete', item)
    .then(result => {
      res.status(200).json({
      message:result + ' deleted',
   });
  })
    .catch(() => {
      alert("error deleting data")
    })
}

  return (
      <View style={styles.container}>
      <Text style={{fontSize: 20, marginTop: 150}}> Add a new personal record</Text>
      <TextInput placeholder={"Your name"}
      style={{width: 200, borderColor:'gray', borderWidth: 1, marginTop: 30}}
      onChangeText={name => setName(name)}
      value={name}
      />
      <TextInput placeholder={"Date"}
      style={{width: 200, borderColor:'gray', borderWidth: 1, marginTop: 30}}
      onChangeText={date => setDate(date)}
      value={date}
      />
      <TextInput placeholder={"Exercise"}
      style={{width: 200, borderColor:'gray', borderWidth: 1, marginTop: 30 }}
      onChangeText={lift => setLift(lift)}
      value={lift}
      />
      <TextInput placeholder={"Result"}
      style={{width: 200, borderColor:'gray', borderWidth: 1, marginTop: 30 , marginBottom: 30}}
      onChangeText={result => setResult(result)}
      value={result}
      />
      <Button style={{marginBottom: 30}} title={'Add'} onPress={createResult}/>
      <FlatList
      data={resultlist}
      keyExtractor={item => item.toString()}
      renderItem={({item}) =>
      <View style={styles.container}><Text style={{fontSize:20}}>{item.name}   {item.date}   {item.lift}   {item.result}</Text>
        <Text style={{color: '#0000ff'}} onPress={() => deleteItem(item)}>delete</Text>
      </View>}
    />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listcontainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});