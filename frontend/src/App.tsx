import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { DataItem, } from 'types/Types';
import PrList from './components/PrList';
import useEditPr from './hooks/useEditPr';
import EditItem from './components/EditItem';
import FormContainer from './components/FormContainer';


export default function App() {
    
    const [prList, setPrList] = useState<DataItem[]>([])
    const [prObject, setPrObject] = useState({ name: '', date: '', lift: '', result: '' })
    const [prObjectIsValid, setPrObjectIsValid] = useState({ name: true, date: true, lift: true, result: true })
    const [isEditMode, setIsEditMode] = useState(false)
    const [editItem, setEditItem] = useState<DataItem>({ _id: 0, name: '', date: '', lift: '', result: '' })

    // TODO: 
    // bugi editissä kun yrittää muuttaa resulttia
    // Typet kuntoon
    // sen jälkeen mietitään onko valmis vai tuleeko laajennusta esim search, filter, auth ja React-Router

    
    return (
        <View style={{flex: 1}}>
            <FormContainer prObject={prObject} setPrObject={setPrObject} prObjectIsValid={prObjectIsValid} setPrObjectIsValid={setPrObjectIsValid} setPrList={setPrList}/>
            {isEditMode ? 
                <EditItem editItem={editItem} setEditItem={setEditItem} useEditPr={useEditPr} setIsEditMode={setIsEditMode} isEditMode={isEditMode} setPrList={setPrList}/>
                :
                <PrList list={prList} setList={setPrList} setIsEditMode={setIsEditMode} setEditItem={setEditItem} />
            }
        </View>
    )
}