import { useEffect, useState } from "react"
import { addGroup, deleteGroup, groupCount, updateGroup, viewAllGroup } from "../services/groupService";

const ManageGroup = () => {
   const [count, setCount] = useState({
    total:0,
    active:0,
    inactive:0
   })

   const [groupName, setGroupName] = useState("");
   const [status, setStatus] = useState(true);
   const [groups,setGroups] = useState([]);
   const [editId, setEditId] = useState(null);
   const [newName, setNewName] = useState("");

   const fetchGroups = async () => {
    try{
      const response = await viewAllGroup();
      setGroups(response.data);
    }catch(e){
      console.error(e);
    }
   }
  
   const fetchCounts = async () =>{
    try{
      const response = await groupCount();
      setCount(response.data);
    }catch(e){
      console.error(e);
    }
   }

   const handleAdd = async () =>{
    if(!groupName.trim()){
        alert("Please enter group name");
        return;
    }
    if(!status){
      alert("Please select status");
      return;
    }

    try{
      const groupData = {
        groupName,
        status
      }
      await addGroup(groupData);

      setGroupName("");
      setStatus("");

      fetchGroups();
      fetchCounts();
    }catch(e){
      console.error(e);
    }
   }

   const handleDelete = async (id) =>{
    try{
      await deleteGroup(id);
      fetchGroups();
      fetchCounts();
    }catch(e){
      console.error(e);
    }
   }

   const handleEdit = (group) =>{
    setEditId(group.id);
    setNewName(group.groupName);
    setStatus(group.isActive);
   }

   const handleUpdate = async () =>{
    try{
      const groupData = {
        groupName:newName,
        isActive: status
      }
      console.log(groupData);
      await updateGroup(editId, groupData);

      setEditId(null);
      setNewName("");
      setGroupName("");
      setStatus(true)

      fetchGroups();
      fetchCounts();
    }catch(e){
      console.error(e);
    }
   }

   const handleCancel = () => {
    setEditId(null);
    setGroupName("");
    setStatus(true);
   }

   useEffect(()=>{
    fetchGroups();
    fetchCounts();
   },[])
  return (
    <div className="m-4">

      {/* group count */}
      <div className="d-flex flex-row gap-3">
        <div className="bg-success rounded p-4">
          <p className="text-white fs-5 fw-bold">Total Groups</p>
          <h4 className="text-white">{count.total}</h4>
        </div>
        <div className="bg-warning rounded p-4">
          <p className="text-white fs-5 fw-bold">Active Groups</p>
          <h4 className="text-white">{count.active}</h4>
        </div>
        <div className="bg-dark-subtle rounded p-4">
          <p className="fs-5 fw-bold">Inactive Groups</p>
          <h4 className="text-dark">{count.inactive}</h4>
        </div>
      </div>

      {/* add group */}
      <div className="mt-4 border rounded p-4 bg-light">
        <h5 className="mb-4">Add New Group</h5>

        <div className="row g-3 align-items-end">

          <div className="col-md-6">
            <label className="form-label">Group Name: </label>
            <input className=" form-control shadow-none" type="text" value={groupName} onChange={(e)=>setGroupName(e.target.value)} />
          </div>

          <div className="col-md-3">
            <label className="form-label">Status</label>
            <select className="form-select shadow-none" onChange={(e)=>setStatus(e.target.value === "true")}>
              <option value={true}>Active</option>
              <option value={false}>Inactive</option>
            </select>
          </div>

          <div className="col-md-3">
            <button className="btn btn-primary" onClick={handleAdd}>Add Group</button>
          </div>

        </div>  
      </div>

      {/* group table */}
      <div className="mt-3 p-4 border rounded bg-light">
        <h5 className="mb-4">All Groups</h5>
        
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Group Name</th>
              <th>Status</th>
              <th width="180"></th>
            </tr>
          </thead>
          <tbody>
            {groups.map((group)=>(
              <tr key={group.id}>
                <td>{group.id}</td>
                <td>{editId === group.id ? 
                  (<input type="text" value={newName} className=" form-control shadow-none" onChange={(e)=>setNewName(e.target.value)}/>) 
                  : (group.groupName)}</td>
                <td>
                  {editId === group.id ? (
                    <select
                      className="form-select"
                      value={status.toString()}
                      onChange={(e) => setStatus(e.target.value === "true")}
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  ) : (
                    <span
                      className={`badge ${
                        group.isActive ? "bg-success" : "bg-secondary"
                      }`}
                    >
                      {group.isActive ? "Active" : "Inactive"}
                    </span>
                  )}
                </td>
                <td>
                  {editId === group.id ? (
                    <>
                      <button className="btn btn-success btn-sm me-2" onClick={handleUpdate}>
                        Save
                      </button>

                      <button className="btn btn-secondary btn-sm" onClick={handleCancel}>
                        Cancel
                      </button>
                    </>
                  ):(
                    <>
                      <button className="btn btn-warning btn-sm me-2" onClick={()=>handleEdit(group)}>
                        Edit
                      </button>

                      <button className="btn btn-danger btn-sm" onClick={()=>handleDelete(group.id)}
                      disabled={!group.isActive}>
                       Delete
                      </button>
                  </>
                  )}
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageGroup
