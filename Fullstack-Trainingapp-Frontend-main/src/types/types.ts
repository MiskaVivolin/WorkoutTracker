export interface DataItem {
    _id: number;
    name: string;
    date: string;
    lift: string;
    result: string;
}

export interface ResponseData {
    data: DataItem[];
    successMessage?: string;
    errorMessage?: string;
}

export type SetResultList = (data: DataItem[]) => void