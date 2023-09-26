import React, {useState} from 'react';
import { StyleSheet, TextInput, Button, View, Text} from 'react-native';
import PrList from './components/PrList';
import CreatePr from './components/api/CreatePr';



export default function App() {
    
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
            <View style={{marginBottom: 30}}>
                <Button title={'Add'} onPress={() => CreatePr(name, date, lift, result)}/>
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