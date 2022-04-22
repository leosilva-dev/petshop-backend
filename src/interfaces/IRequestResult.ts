export interface IRequestResult<T = any>{
    data: T;
    token?: string;
    success: boolean;
    message?: string;
}