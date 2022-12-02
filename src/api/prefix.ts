import axios from "./axios";
export const PrefixService = {
    queryAll: (...args) => axios.get("/prefix/all", ...args),
    queryList: (...args) => axios.get("/prefix/list", ...args),
    add: (...args) => axios.post("/prefix/add", ...args),
    edit: (...args) => axios.post("/prefix/edit", ...args),
    delete: (...args) => axios.post("/prefix/delete", ...args),
};

// -1、类型
export interface prefixType {
    id: string;
    affix: string;
    pie?: string;
    translation?: string;
    example?: string;
    category?: string;
    frequency?: string;
    note?: string;
    source?: string;
    grade?: string;
    level?: string;
}
