import React, {useState, useEffect} from 'react';
import { StyleSheet, TextInput, Button, View, Text, TouchableOpacity} from 'react-native';
import { DataItem, PrListProps } from 'types/Types';
import PrList from './components/PrList';
import useCreatePr from './hooks/useCreatePr';
import InputContainer from './components/InputContainer';
import useEditPr from './hooks/useEditPr';
import EditItem from './components/EditItem';


export default function App() {
    
    const [prList, setPrList] = useState<DataItem[]>([])
    const [prObject, setPrObject] = useState({
        name: '',
        date: '',
        lift: '',
        result: ''
    })
    const [prObjectIsValid, setPrObjectIsValid] = useState({
        name: true,
        date: true,
        lift: true,
        result: true
    })

    const [isEditMode, setIsEditMode] = useState(false)
    const [editItem, setEditItem] = useState<DataItem>({})


    const handleButtonPress = (): void => {
        if(prObject.name.length === 0) {
            setPrObjectIsValid(prevState => ({ ...prevState, name: false }))
        } else {
            setPrObjectIsValid(prevState => ({ ...prevState, name: true }))
        }
        if(prObject.date.length === 0) {
            setPrObjectIsValid(prevState => ({ ...prevState, date: false }))
        } else {
            setPrObjectIsValid(prevState => ({ ...prevState, date: true }))
        }
        if(prObject.lift.length === 0) {
            setPrObjectIsValid(prevState => ({ ...prevState, lift: false }))
        } else {
            setPrObjectIsValid(prevState => ({ ...prevState, lift: true }))
        }
        if(prObject.result.length === 0) {
            setPrObjectIsValid(prevState => ({ ...prevState, result: false }))
        } else {
            setPrObjectIsValid(prevState => ({ ...prevState, result: true }))
        }
        if(prObject.name.length !== 0 && prObject.date.length !== 0 && prObject.lift.length !== 0 && prObject.result.length !== 0){
            useCreatePr(prObject, setPrList)
        }
    }

    // TODO: 
    // tyylittely
    // UPDATE
    // sen jälkeen mietitään onko valmis vai tuleeko laajennus + auth ja React-Router

    
    return (
        <View style={styles.container}>
            <Text style={{fontSize: 20, marginTop: 150}}> Add a new personal record</Text>
            <InputContainer header={"Name"} value={"name"} object={prObject} setObject={setPrObject} objectIsValid={prObjectIsValid}/>    
            <InputContainer header={"Date"} value={"date"} object={prObject} setObject={setPrObject} objectIsValid={prObjectIsValid}/>    
            <InputContainer header={"Exercise"} value={"lift"} object={prObject} setObject={setPrObject} objectIsValid={prObjectIsValid}/>    
            <InputContainer header={"Result"} value={"result"} object={prObject} setObject={setPrObject} objectIsValid={prObjectIsValid}/>    
            <View style={{marginTop: 30, marginBottom: 30}}>
                <Button title={'Add'} onPress={() => handleButtonPress()}/>
            </View>

            {isEditMode ? 
            <EditItem editItem={editItem} setEditItem={setEditItem} useEditPr={useEditPr} setIsEditMode={setIsEditMode}/>
            :
            <PrList list={prList} setList={setPrList} setIsEditMode={setIsEditMode} setEditItem={setEditItem} />
            }
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