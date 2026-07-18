import api from "./api"

export const addBrand = (brand) => {
    return api.post("/brand",brand)
}

export const updateBrand = (id, brand) => {
    return api.put(`/brand/${id}`,brand)
}

export const deleteBrand = (id) => {
    return api.delete(`/brand/${id}`)
}

export const viewBrand = () => {
    return api.get("/brand")
}

export const getBrandByChain = (chainId) => {
    return api.get(`/brand/chain/${chainId}`)
}

export const totalBrand = () => {
    return api.get("/brand/total")
}