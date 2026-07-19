import { useEffect, useState } from "react"
import { groupCount } from "../services/groupService"
import { totalChain } from "../services/chainService"
import { totalBrand, viewBrand } from "../services/brandService"
import { addZone, deleteZone, totalZone, updateZone, viewZone } from "../services/zoneService"

const ManageSubzone = () => {

  const [countGroup, setCountGroup] = useState({
    total:0
  })
  const [countChain, setCountChain] = useState(0)
  const [countBrand, setCountBrand] = useState(0)
  const [countZone, setCountZone] = useState(0)

  const [zones, setZones] = useState([])
  const [brands, setBrands] = useState([])

  const [zoneName, setZoneName] = useState("")
  const [brandId, setBrandId] = useState("")
  const [editId, setEditId] = useState(null)
  const [newZoneName, setNewZoneName] = useState("")
  const [newBrandId, setNewBrandId] = useState("")

  const fetchZone = async () => {
    try{
      const res = await viewZone();
      setZones(res.data)
    }catch(err){
      console.error(err);
    }
  }

  const fetchBrands = async () => {
    try{
      const res = await viewBrand();
      setBrands(res.data)
    }catch(err){
      console.error(err)
    }
  }


  const fetchCounts = async () => {
      try{
        const [groupResponse, chainResponse, brandResponse, zoneResponse] = await Promise.all([
          groupCount(),
          totalChain(),
          totalBrand(),
          totalZone()
        ])
        setCountGroup(groupResponse.data)
        setCountChain(chainResponse.data)
        setCountBrand(brandResponse.data)
        setCountZone(zoneResponse.data)
      }catch(err){
        console.error(err);
      }
    }

  useEffect(()=>{
    fetchCounts();
    fetchBrands();
    fetchZone();
  },[])

  const handleAdd = async () => {
    if(!zoneName.trim()){
      alert("Zone name is required")
    }
    if(!brandId){
      alert("Select Brand")
    }
    
    try{
      const zoneData = {
        zoneName,
        brandId
      }
      await addZone(zoneData);
      setZoneName("")
      setBrandId("")
      fetchBrands()
      fetchZone()
    }catch(err){
      console.error(err);
    }
  }

  const handleEdit = (zone) => {
      setEditId(zone.id)
      setNewZoneName(zone.zoneName)
      setNewBrandId(zone.brandId)
  }

  const handleUpdate = async () => {
    try{
      const brandData = {
        zoneName: newZoneName,
        brandId: newBrandId
      }
      await updateZone(editId,brandData);
      setEditId(null)
      setZoneName("")
      setBrandId("")
      fetchBrands()
      fetchZone()
    }catch(err){
      console.error(err)
    }
  }

  const handleCancel = () => {
    setEditId(null)
    setNewZoneName("")
    setNewBrandId("")
  }

  const handleDelete = async (id) => {
    try{
      await deleteZone(id);
      fetchBrands()
      fetchZone()
    }catch(err){
      console.error(err)
    }
  }


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
        <div className="bg-info rounded p-4">
          <p className="text-white fs-5 fw-bold">Total Zones</p>
          <h4 className="text-white">{countZone}</h4>
        </div>
      </div>

      {/* add zone */}
      <div className="mt-4 border rounded p-4 bg-light">
        <h5 className="mb-4">Add New Zone</h5>

        <div className="row g-3 align-items-end">

          <div className="col-md-5">
            <label className="form-label">Zone Name: </label>
            <input className=" form-control shadow-none" type="text" value={zoneName} onChange={(e)=> setZoneName(e.target.value)}/>
          </div>

          <div className="col-md-4">
            <label className="form-label">Brand</label>
            <select className="form-select shadow-none" value={brandId} onChange={(e)=>setBrandId(e.target.value)}>
              <option value="">Select Brand</option>
              {brands.map((brand)=>(
                <option key={brand.id} value={brand.id}>{brand.brandName}</option>
              ))}
            </select>
          </div>

          <div className="col-md-3">
            <button className="btn btn-primary" onClick={handleAdd}>Add Brand</button>
          </div>

        </div>

      </div>


      <div className="mt-3 p-4 border rounded bg-light">
        <h5 className="mb-4">All Zones</h5>
        
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Zone</th>
              <th>Brand</th>
              <th>Company</th>
              <th>Group</th>
              <th>Status</th>
              <th width="180"></th>
            </tr>
          </thead>
          <tbody>
            {zones.map((zone)=>(
              <tr key={zone.id}>
                <td>{zone.id}</td>

                <td>{editId === zone.id ? 
                  (<input type="text" value={newZoneName} className=" form-control shadow-none" onChange={(e)=>setNewZoneName(e.target.value)}/>) 
                  : (zone.zoneName)}
                </td>

                <td>
                  {editId === zone.id ? (
                    <select
                      className="form-select"
                      value={newBrandId}
                      onChange={(e) => setNewBrandId(e.target.value)}
                    >
                      {brands.map((brand)=>(
                        <option key={brand.id} value={brand.id}>
                          {brand.brandName}
                        </option>
                      ))}
                    </select>
                  ) : (
                    zone.brandName
                  )}
                </td>

                <td>
                  {zone.chainName}
                </td>

                <td>
                  {zone.groupName}
                </td>

                <td>
                  <span
                    className={`badge ${
                      zone.active ? "bg-success" : "bg-secondary"
                    }`}
                  >
                    {zone.active ? "Active" : "Inactive"}
                  </span>
                </td>

                <td>
                  {editId === zone.id ? (
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
                      <button className="btn btn-warning btn-sm me-2" onClick={()=>handleEdit(zone)}>
                        Edit
                      </button>

                      <button className="btn btn-danger btn-sm" onClick={()=>handleDelete(zone.id)}
                      disabled={!zone.active}>
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

export default ManageSubzone
