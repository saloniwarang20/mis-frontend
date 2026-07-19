import api from './api'

export const addZone = (zone) => {
    return api.post("/zone",zone)
}

export const updateZone = (id, zone) => {
    return api.put(`/zone/${id}`,zone)
}

export const deleteZone = (id) => {
    return api.delete(`/zone/${id}`)
}

export const viewZone = () => {
    return api.get("/zone")
}

export const getZoneByBrand = (brandId) => {
    return api.get(`/zone/brand/${brandId}`)
}

export const totalZone = () => {
    return api.get("/zone/total")
}