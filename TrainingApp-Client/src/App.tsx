import React, {useState} from 'react';
import { StyleSheet, TextInput, Button, View, Text} from 'react-native';
import PrList from './components/PrList';
import CreatePr from './components/api/CreatePr';



export default function App() {
    
    const [prObject, setPrObject] = useState({
        name: '',
        date: '',
        lift: '',
        result: ''
    })
    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const [lift, setLift] = useState('')
    const [result, setResult] = useState('')

    //prevstate?

    
    return (
        <View style={styles.container}>
            <Text style={{fontSize: 20, marginTop: 150}}> Add a new personal record</Text>
            <TextInput placeholder={"Your name"}
                style={{width: 200, borderColor:'gray', borderWidth: 1, marginTop: 30}}
                onChangeText={newName => setPrObject({ ...prObject, name: newName })}
                value={prObject.name}
                />
            <TextInput placeholder={"Date"}
                style={{width: 200, borderColor:'gray', borderWidth: 1, marginTop: 30}}
                onChangeText={newDate => setPrObject({ ...prObject, date: newDate })}
                value={prObject.date}
                />
            <TextInput placeholder={"Exercise"}
                style={{width: 200, borderColor:'gray', borderWidth: 1, marginTop: 30 }}
                onChangeText={newLift => setPrObject({ ...prObject, lift: newLift })}
                value={prObject.lift}
                />
            <TextInput placeholder={"Result"}
                style={{width: 200, borderColor:'gray', borderWidth: 1, marginTop: 30 , marginBottom: 30}}
                onChangeText={newResult => setPrObject({ ...prObject, result: newResult })}
                value={prObject.result}
                />
            <View style={{marginBottom: 30}}>
                <Button title={'Add'} onPress={() => CreatePr(prObject.name, prObject.date, prObject.lift, prObject.result)}/>
            </View>
            <PrList />
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
    
});