export interface WorkoutData {
    user_id: number;
    name: string;
    date: string;
    exercise: string;
    result: string;
}

// export interface DataItem {
//     user_id: number;
//     user: string;
//     name: string;
//     date: string;
//     exercise: string;
//     result: string;
// }

export interface PostReq {
    body: WorkoutData
}

export interface PostRes {
    status(arg0: number): PostRes;
    json: (args: string | { error: string }) => void;
}

export interface GetRes {
    status(arg0: number): GetRes;
    json: (args: string | { error: string } ) => void;
}

export interface GetItemReq {
    query: { id: number };
    params: { id: number };
}
export interface DeleteReq {
    query: { id: number };
}

export interface DeleteRes {
    json: (args: { message: string }) => void;
}