import api from "./api";

export const createInvoice = (invoiceData) => {
    return api.post("/invoice", invoiceData);
}

export const viewAllInvoices = () => {
    return api.get("/invoice");
}

export const updateInvoice = (id, invoiceData) => {
    return api.put(`/invoice/${id}`, invoiceData);
}

export const deleteInvoice = (id) => {
    return api.delete(`/invoice/${id}`);
}