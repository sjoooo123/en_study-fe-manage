import axios from "./axios";
export const WordService = {
    queryList: (...args) => axios.get("/Word/list", ...args),
    add: (...args) => axios.post("/Word/add", ...args),
    edit: (...args) => axios.post("/Word/edit", ...args),
    delete: (...args) => axios.post("/Word/delete", ...args),
};
