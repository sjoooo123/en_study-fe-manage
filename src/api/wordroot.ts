import axios from "./axios";
export const WordrootService = {
    queryAll: (...args) => axios.get("/wordroot/all", ...args),
    queryList: (...args) => axios.get("/wordroot/list", ...args),
    add: (...args) => axios.post("/wordroot/add", ...args),
    edit: (...args) => axios.post("/wordroot/edit", ...args),
    delete: (...args) => axios.post("/wordroot/delete", ...args),
};

// -1、类型
export interface wordrootType {
    id: string;
    wordroot: string;
    pie?: string;
    translation?: string;
    category?: string;
    frequency?: string;
    note?: string;
    source?: string;
    vary?: string;
    level?: string;
    grade?: string;
}
