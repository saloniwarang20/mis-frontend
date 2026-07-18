import { useEffect, useState } from "react"
import { groupCount, viewAllGroup } from "../services/groupService"
import { totalChain, viewAllChain } from "../services/chainService"
import { addBrand, deleteBrand, totalBrand, updateBrand, viewBrand } from "../services/brandService"

const normalizeList = (value) => {
  if (Array.isArray(value)) return value
  if (value && Array.isArray(value.data)) return value.data
  return []
}

const ManageBrand = () => {
  const [countGroup, setCountGroup] = useState({
    total:0
  })
  const [countChain, setCountChain] = useState(0)
  const [countBrand, setCountBrand] = useState(0)

  const [groups, setGroups] = useState([])
  const [chains, setChains] = useState([])
  const [brands, setBrands] = useState([])

  const [brandName, setBrandName] = useState("")
  const [chainId, setChainId] = useState("")
  const [editId, setEditId] = useState(null)
  const [newBrandName, setNewBrandName] = useState("")
  const [newChainId, setNewChainId] = useState("")

  const fetchGroups = async () => {
    try{
      const res = await viewAllGroup();
      setGroups(normalizeList(res?.data))
    }catch(err){
      console.error(err);
    }
  }

  const fetchChains = async () => {
    try{
      const res = await viewAllChain();
      setChains(normalizeList(res?.data))
    }catch(err){
      console.error(err)
    }
  }

  const fetchBrands = async () => {
    try{
      const res = await viewBrand();
      setBrands(normalizeList(res?.data))
    }catch(err){
      console.error(err)
    }
  }

  const fetchCounts = async () => {
    try{
      const [groupResponse, chainResponse, brandResponse] = await Promise.all([
        groupCount(),
        totalChain(),
        totalBrand()
      ])
      setCountGroup(groupResponse.data)
      setCountChain(chainResponse.data)
      setCountBrand(brandResponse.data)
    }catch(err){
      console.error(err);
    }
  }

  const handleAdd = async () => {
    if(!brandName.trim()){
      alert("Enter Brand Name")
      return
    }
    if(!chainId){
      alert("Select Chain")
      return
    }

    try{
      const brandData = {brandName, chainId}
      await addBrand(brandData);
      setBrandName("")
      setChainId("")
      fetchBrands()
      fetchChains()
    }catch(err){
      console.error(err)
    }
  }

  const handleEdit = (brand) => {
    setEditId(brand.id)
    setNewBrandName(brand.brandName)
    setNewChainId(brand.chainId)
  }

  const handleUpdate = async () => {
    try{
      const brandData = {
        brandName : newBrandName,
        chainId :  newChainId
      }
      await updateBrand(editId, brandData)
      setEditId(null)
      setBrandName("")
      setChainId("")
      fetchBrands()
      fetchChains()
    }catch(err){
      console.error(err)
    }
  }

  const handleCancel = () => {
    setEditId(null)
    setNewBrandName("")
    setNewChainId("")
  }

  const handleDelete = async (id) => {
    try{
      await deleteBrand(id)
      fetchChains()
      fetchBrands()
    }catch(err){
      console.error(err)
    }
  }


  useEffect(()=>{
    fetchGroups(),
    fetchChains(),
    fetchBrands(),
    fetchCounts()
  },[])


  return (
    <div className="m-4">
      
      <div className="d-flex flex-row gap-3">
        <div className="bg-success rounded p-4">
          <p className="text-white fs-5 fw-bold">Total Groups</p>
          <h4 className="text-white">{countGroup.total}</h4>
        </div>
        <div className="bg-warning rounded p-4">
          <p className="text-white fs-5 fw-bold">Total Chains</p>
          <h4 className="text-white">{countChain}</h4>
        </div>
        <div className="bg-danger rounded p-4">
          <p className="text-white fs-5 fw-bold">Total Chains</p>
          <h4 className="text-white">{countBrand}</h4>
        </div>
      </div>

      {/* add brand */}
      <div className="mt-4 border rounded p-4 bg-light">
        <h5 className="mb-4">Add New Brand</h5>

        <div className="row g-3 align-items-end">

          <div className="col-md-5">
            <label className="form-label">Brand Name: </label>
            <input className=" form-control shadow-none" type="text" value={brandName} onChange={(e)=> setBrandName(e.target.value)}/>
          </div>

          <div className="col-md-4">
            <label className="form-label">Chain</label>
            <select className="form-select shadow-none" value={chainId} onChange={(e)=>setChainId(e.target.value)}>
              <option value="">Select Chain</option>
              {chains.map((chain)=>(
                <option key={chain.id} value={chain.id}>{chain.companyName}</option>
              ))}
            </select>
          </div>

          <div className="col-md-3">
            <button className="btn btn-primary" onClick={handleAdd}>Add Brand</button>
          </div>

      </div>

        {/* brand table */}
      <div className="mt-3 p-4 border rounded bg-light">
        <h5 className="mb-4">All Brands</h5>
        
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Brand</th>
              <th>Chain</th>
              <th>Group</th>
              <th>Status</th>
              <th width="180"></th>
            </tr>
          </thead>
          <tbody>
            {brands.map((brand)=>(
              <tr key={brand.id}>
                <td>{brand.id}</td>

                <td>{editId === brand.id ? 
                  (<input type="text" value={newBrandName} className=" form-control shadow-none" onChange={(e)=>setNewBrandName(e.target.value)}/>) 
                  : (brand.brandName)}
                </td>

                <td>
                  {editId === brand.id ? (
                    <select
                      className="form-select"
                      value={newChainId}
                      onChange={(e) => setNewChainId(e.target.value)}
                    >
                      {chains.map((chain)=>(
                        <option key={chain.id} value={chain.id}>
                          {chain.companyName}
                        </option>
                      ))}
                    </select>
                  ) : (
                    brand.chainName
                  )}
                </td>

                <td>
                  {brand.groupName}
                </td>

                <td>
                  <span
                    className={`badge ${
                      brand.active ? "bg-success" : "bg-secondary"
                    }`}
                  >
                    {brand.active ? "Active" : "Inactive"}
                  </span>
                </td>

                <td>
                  {editId === brand.id ? (
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
                      <button className="btn btn-warning btn-sm me-2" onClick={()=>handleEdit(brand)}>
                        Edit
                      </button>

                      <button className="btn btn-danger btn-sm" onClick={()=>handleDelete(brand.id)}
                      disabled={!brand.active}>
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

export default ManageBrand
