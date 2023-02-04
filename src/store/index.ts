import { createStore } from "vuex";
import category from "./modules/category";
import pieroot from "./modules/pieroot";
export default createStore({
    modules: {
        category,
        pieroot
    },
});
