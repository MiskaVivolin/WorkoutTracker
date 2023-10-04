import { ReactNode } from 'react'

export interface DataItem {
    id: number;
    name: string;
    date: string;
    lift: string;
    result: string;
}

export interface PrFields {
    name: string;
    date: string;
    lift: string;
    result: string;
}

export interface ResponseData {
    map(arg0: (item: any) => { name: any; date: any; lift: any; result: any; }): DataItem[];
    data: {
        items: DataItem[];
    }
    message: string;
}

export interface PrListProps {
    list: DataItem[]
}

export type SetResultList = (data: DataItem[]) => void

export type ContextChildren = {
    children: ReactNode;
}

export type ResultListState = {
    resultList: DataItem[];
    setResultList: SetResultList;
}
