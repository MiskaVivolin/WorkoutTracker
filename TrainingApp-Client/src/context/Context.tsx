import React, { useContext, createContext, useState, ReactNode } from 'react'
import { ContextChildren, ResultListState, DataItem } from 'types/Types';

const ResultListContext = createContext<ResultListState | undefined>(undefined);

export const useResultList = () => useContext(ResultListContext)

export default function ContextProvider({ children }: ContextChildren) {
    const [resultList, setResultList] = useState<DataItem[]>([])

    return (
        <ResultListContext.Provider
        value = {{
            resultList,
            setResultList
        }}
        >
            {children}
        </ResultListContext.Provider>
    )
}