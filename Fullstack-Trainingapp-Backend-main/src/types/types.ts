export interface DataItem {
    id: number;
    name: string;
    date: string;
    lift: string;
    result: string;
}

export interface PostReq {
    body: {
        name: string,
        date: string,
        lift: string,
        result: string
    }
}

export interface PostRes {
    json: (args: { 
        message: string
    }) => void; 
}

export interface GetRes {
    json: (args: DataItem | {
        message: string
    }) => void
}

export interface DeleteReq {
    query: {
        id: number
    }
}

export interface DeleteRes {
    json: (args: {
        message: string
    }) => void
}