import React, {useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import { DataItem, } from 'types/Types';
import PrList from './components/PrList';
import InputContainer from './components/InputContainer';
import useEditPr from './hooks/useEditPr';
import EditItem from './components/EditItem';
import usePrValidation from './hooks/usePrValidation';


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
    const [editItem, setEditItem] = useState<DataItem>({_id: 0, name: '', date: '', lift: '', result: ''})

    // TODO: 
    // tyylittely
    // sen jälkeen mietitään onko valmis vai tuleeko laajennus + auth ja React-Router

    
    return (
        <View style={styles.container}>
            <Text style={{fontSize: 24, marginTop: 150}}>Add a new personal record</Text>
            <InputContainer header={"Name"} value={"name"} object={prObject} setObject={setPrObject} objectIsValid={prObjectIsValid}/>    
            <InputContainer header={"Date"} value={"date"} object={prObject} setObject={setPrObject} objectIsValid={prObjectIsValid}/>    
            <InputContainer header={"Exercise"} value={"lift"} object={prObject} setObject={setPrObject} objectIsValid={prObjectIsValid}/>    
            <InputContainer header={"Result"} value={"result"} object={prObject} setObject={setPrObject} objectIsValid={prObjectIsValid}/>    
            <View style={{marginTop: 30, marginBottom: 30}}>
                <TouchableOpacity style={styles.button} 
                    onPress={() => usePrValidation(prObject, setPrObjectIsValid, setPrList, setPrObject)}>
                    <Text style={{fontSize: 16}}>add</Text>
                </TouchableOpacity>
            </View>
            {isEditMode ? 
            <EditItem editItem={editItem} setEditItem={setEditItem} useEditPr={useEditPr} setIsEditMode={setIsEditMode}/>
            :
            <PrList list={prList} setList={setPrList} setIsEditMode={setIsEditMode} setEditItem={setEditItem} />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#66a3ff',
        paddingRight: 14, 
        paddingLeft: 14,
        paddingBottom: 3,
        paddingTop: 3,
        borderRadius: 8, 
        borderWidth: 1, 
        borderColor: '#606060'
    }
});