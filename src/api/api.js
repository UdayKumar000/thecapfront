import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8087",
    headers: {
        "Content-Type": "application/json"
    }
});

export const getVendors = () => api.get("/vendors");

export const getCategories = () => api.get("/categories");

export const getUnitAndTypeList = (categoryId) =>
    api.post("/getUnitAndTypeList", {
        materialCategoryId: categoryId
    });

export const addPurchase = (purchase) =>
    api.post("/addPurchaseDetail", purchase);

export const getPurchaseReport = (data) =>
    api.post("/report/controller/getPurchaseDetails", data);

export default api;


