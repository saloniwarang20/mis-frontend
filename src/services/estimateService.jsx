import api from "./api"

export const addEstimate = (estimate) => {
    return api.post("/estimate",estimate)
}

export const updateEstimate = (id, estimate) => {
    return api.put(`/estimate/${id}`,estimate)
}

export const deleteEstimate = (id) => {
    return api.delete(`/estimate/${id}`)
}

export const viewEstimate = () => {
    return api.get("/estimate")
}

export const getEstimateByZone = (zoneId) => {
    return api.get(`/estimate/zone/${zoneId}`)
}

export const totalEstimate = () => {
    return api.get("/estimate/total")
}