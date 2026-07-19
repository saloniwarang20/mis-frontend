import { addChain, deleteChain, totalChain, updateChain, viewAllChain } from "../services/chainService";
import { groupCount, viewAllGroup } from "../services/groupService";
import { useState, useEffect } from "react";

const ManageChain = () => {
  const [countGroup, setCountGroup] = useState({
      total:0,
  })

  const [countChain, setCountChain] = useState(0)

  const [groups, setGroups] = useState([]);
  const [chains, setChains] = useState([]);

  const [companyName, setCompanyName] = useState("")
  const [gstNo, setGstNo] = useState("")
  const [groupId, setGroupId] = useState("")
  const[editId, setEditId] = useState(null);
  const [newCompanyName, setNewCompanyName] = useState("")
  const [newGstNo, setNewGstNo] = useState("")
  const [newGroupId, setNewGroupId] = useState("")

  const fetchGroups = async () => {
    try{
      const response = await viewAllGroup();
      setGroups(response.data)
    }catch(error){
      console.error(error);
    }
  }

  const fetchChains = async () => {
    try{
      const response = await viewAllChain();
      console.log(response.data);
      setChains(response.data)
    }catch(error){
      console.error(error);
    }
  }

  const fetchCounts = async () =>{
      try{
        const [groupResponse, chainResponse] = await Promise.all([
          groupCount(),
          totalChain(),
        ]);
        setCountGroup(groupResponse.data)
        setCountChain(chainResponse.data)
      }catch(e){
        console.error(e);
      }
  }

  const handleAdd = async () =>{
    if(!companyName.trim()){
      alert("Enter Company Name")
      return;
    }
    if(!gstNo.trim()){
      alert("Enter GST No.")
      return;
    }
    if(!groupId){
      alert("Select Group")
      return;
    }

    try{
      const chainData = {
        companyName, gstNo, groupId
      }
      await addChain(chainData)
      setCompanyName("")
      setGstNo("")
      setGroupId("")
      fetchChains();
      fetchCounts();
    }catch(error){
      console.error(error)
    }
  }

  const handleEdit = (chain) => {
    setEditId(chain.id)
    setNewCompanyName(chain.companyName)
    setNewGstNo(chain.gstNo)
    setNewGroupId(chain.groupId)
  }

  const handleUpdate = async () => {
    try{
      const chainData = {
        companyName: newCompanyName,
        gstNo: newGstNo,
        groupId: newGroupId
      };
      await updateChain(editId, chainData)
      setEditId(null)
      setNewCompanyName("")
      setNewGstNo("")
      setNewGroupId("")
      fetchChains()
      fetchCounts()
    }catch(error){
      console.error(error)
    }
  }

  const handleCancel = () => {
    setEditId(null)
    setNewCompanyName("")
    setNewGstNo("")
    setNewGroupId("")
  }

  const handleDelete = async (id) =>{
    try{
      await deleteChain(id);
      fetchChains()
      fetchCounts()
    }catch(error){
      console.error(error);
    }
  }
 
  useEffect(()=>{
    fetchGroups();
    fetchChains();
    fetchCounts();
    },[])
     
  return (
    <div  className="m-4">

      <div className="d-flex flex-row gap-3">
        <div className="bg-success rounded p-4">
          <p className="text-white fs-5 fw-bold">Total Groups</p>
          <h4 className="text-white">{countGroup.total}</h4>
        </div>
        <div className="bg-warning rounded p-4">
          <p className="text-white fs-5 fw-bold">Total Chains</p>
          <h4 className="text-white">{countChain}</h4>
        </div>
      </div>

      {/* add chain */}
      <div className="mt-4 border rounded p-4 bg-light">
        <h5 className="mb-4">Add New Chain</h5>

        <div className="row g-3 align-items-end">

          <div className="col-md-4">
            <label className="form-label">Company Name: </label>
            <input className=" form-control shadow-none" type="text" value={companyName} onChange={(e)=>setCompanyName(e.target.value)} />
          </div>

          <div className="col-md-4">
            <label className="form-label">GST Number: </label>
            <input className=" form-control shadow-none" type="text" value={gstNo} onChange={(e)=>setGstNo(e.target.value)} />
          </div>

          <div className="col-md-4">
            <label className="form-label">Group</label>
            <select className="form-select shadow-none" value={groupId} onChange={(e)=>setGroupId(e.target.value)}>
              <option value="">Select Group</option>
              {groups.map((group)=>(
                <option key={group.id} value={group.id}>{group.groupName}</option>
              ))}
            </select>
          </div>

          <div className="col-md-3">
            <button className="btn btn-primary" onClick={handleAdd}>Add Chain</button>
          </div>

      </div>

        {/* chain table */}
      <div className="mt-3 p-4 border rounded bg-light">
        <h5 className="mb-4">All Chains</h5>
        
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Company</th>
              <th>GST</th>
              <th>Group</th>
              <th>Status</th>
              <th width="180"></th>
            </tr>
          </thead>
          <tbody>
            {chains.map((chain)=>(
              <tr key={chain.id}>
                <td>{chain.id}</td>

                <td>{editId === chain.id ? 
                  (<input type="text" value={newCompanyName} className=" form-control shadow-none" onChange={(e)=>setNewCompanyName(e.target.value)}/>) 
                  : (chain.companyName)}
                </td>

                <td>{editId === chain.id ? 
                  (<input type="text" value={newGstNo} className=" form-control shadow-none" onChange={(e)=>setNewGstNo(e.target.value)}/>) 
                  : (chain.gstNo)}
                </td>

                <td>
                  {editId === chain.id ? (
                    <select
                      className="form-select"
                      value={newGroupId}
                      onChange={(e) => setNewGroupId(e.target.value)}
                    >
                      {groups.map((group)=>(
                        <option key={group.id} value={group.id}>
                          {group.groupName}
                        </option>
                      ))}
                    </select>
                  ) : (
                    chain.groupName
                  )}
                </td>

                <td>
                  <span
                    className={`badge ${
                      chain.isActive ? "bg-success" : "bg-secondary"
                    }`}
                  >
                    {chain.isActive ? "Active" : "Inactive"}
                  </span>
                </td>

                <td>
                  {editId === chain.id ? (
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
                      <button className="btn btn-warning btn-sm me-2" onClick={()=>handleEdit(chain)}>
                        Edit
                      </button>

                      <button className="btn btn-danger btn-sm" onClick={()=>handleDelete(chain.id)}
                      disabled={!chain.isActive}>
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
    </div>
  )
}

export default ManageChain
