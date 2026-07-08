import api from './api'

export const addChain = (chainData) => {
    return api.post("/chain",chainData)
}

export const viewAllChain = () =>{
    return api.get("/chain")
}

export const updateChain = (id, chainData) => {
    return api.put(`/chain/${id}`,chainData)
}

export const deleteChain = (id) => {
    return api.delete(`/chain/${id}`)
}

export const filterByGroup = (groupId) => {
    return api.get(`/chain/group/${groupId}`)
}

export const totalChain = () => {
    return api.get("/chain/count")
}