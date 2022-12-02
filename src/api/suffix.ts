import axios from "./axios";
export const SuffixService = {
    queryAll: (...args) => axios.get("/suffix/all", ...args),
    queryList: (...args) => axios.get("/suffix/list", ...args),
    add: (...args) => axios.post("/suffix/add", ...args),
    edit: (...args) => axios.post("/suffix/edit", ...args),
    delete: (...args) => axios.post("/suffix/delete", ...args),
};

// -1、类型
export interface suffixType {
    id: string;
    affix: string;
    pie?: string;
    translation?: string;
    example?: string;
    category?: string;
    frequency?: string;
    note?: string;
    source?: string;
    level?: string;
    grade?: string;
}
