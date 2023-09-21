import React from 'react';
import axios from "axios";
import { StyleSheet, TextInput, Button, View, Text} from 'react-native';
import PrList from './components/PrList';
import getList from './components/crudcomponents/GetList';
import CreatePr from './components/crudcomponents/CreatePr';



export default function App() {
    
    const [name, setName] = React.useState('')
    const [date, setDate] = React.useState('')
    const [lift, setLift] = React.useState('')
    const [result, setResult] = React.useState('')
    
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
            <Button style={{marginBottom: 30}} title={'Add'} onPress={() => CreatePr(name, date, lift, result)}/>
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