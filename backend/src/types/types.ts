export interface DataItem {
    id: number;
    user: string;
    name: string;
    date: string;
    exercise: string;
    result: string;
}

export interface PostReq {
    body: {
        username: string,
        prObject: {
            name: string,
            date: string,
            exercise: string,
            result: string
        }
    }
}

export interface PostRes {
    json: (args: string | { 
        message: string
    }) => void; 
}

export interface GetRes {
    json: (args: DataItem | {
        message: string
    }) => void
}

export interface GetItemReq {
    query: {
        id: number
    }
    params: {
        id: number
    }
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