import axios from "./axios";
export const WordService = {
    queryList: (...args) => axios.get("/Word/list", ...args),
    add: (...args) => axios.post("/Word/add", ...args),
    edit: (...args) => axios.post("/Word/edit", ...args),
    delete: (...args) => axios.post("/Word/delete", ...args),
};

// -1、类型
export interface wordType {
    id: string;
    word: string;
    phonetic?: string;
    translation?: string;
    category?: string;
    pie?: string;
    root?: string;
    prefix?: string;
    suffix?: string;
    memskill?: string;
    grade?: string;
    level?: string;
    note?: string;
}
