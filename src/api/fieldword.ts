import axios from "./axios";
export const FieldWordService = {
    queryList: (...args) => axios.get("/FieldWord/list", ...args),
    add: (...args) => axios.post("/FieldWord/add", ...args),
    edit: (...args) => axios.post("/FieldWord/edit", ...args),
    delete: (...args) => axios.post("/FieldWord/delete", ...args),
};
