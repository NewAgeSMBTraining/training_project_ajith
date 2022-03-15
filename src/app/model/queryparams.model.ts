export interface Queryparams {
    offset?:number;
    limit?:number;
    populate?:string[];
    data?:{
        [key:string]:any;
    }
}
