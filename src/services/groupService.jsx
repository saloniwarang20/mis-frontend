import api from "./api"

export const addGroup = (groupData) =>{
    return api.post("/group",groupData);
}

export const viewAllGroup = () =>{
    return api.get("/group");
}

export const activeGroup = () => {
    return api.get("/group/active");
}

export const inactiveGroup = () => {
    return api.get("/group/inactive");
}

export const updateGroup = (id,groupData) => {
    return api.put(`/group/${id}`,groupData);
}

export const deleteGroup = (id) => {
    return api.delete(`/group/${id}`);
}

export const groupCount = () => {
    return api.get("/group/counts");
}