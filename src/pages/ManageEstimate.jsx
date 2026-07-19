import { useEffect, useState } from "react"
import { addEstimate, deleteEstimate, totalEstimate, updateEstimate, viewEstimate } from "../services/estimateService"
import { viewZone } from "../services/zoneService"

const ManageEstimate = () => {

  const [estimates, setEstimates] = useState([])
  const [zones, setZones] = useState([])

  const [countEstimate, setCountEstimate] = useState(0)

  const [service, setService] = useState("")
  const [quantity, setQuantity] = useState("")
  const [costPerUnit, setCostPerUnit] = useState("")
  const [deliveryDate, setDeliveryDate] = useState("")
  const [deliveryDetails, setDeliveryDetails] = useState("")
  const [zoneId, setZoneId] = useState("")
  const [editId, setEditId] = useState(null)
  const [newZoneId, setNewZoneId] = useState("")
  const [newService, setNewService] = useState("")
  const [newQuantity, setNewQuantity] = useState("")
  const [newCostPerUnit, setNewCostPerUnit] = useState("")
  const [newDeliveryDate, setNewDeliveryDate] = useState("")
  const [newDeliveryDetails, setNewDeliveryDetails] = useState("")

  const fetchCount = async () => {
    try{
      const response = await totalEstimate();
      setCountEstimate(response.data)
    }catch(err){
      console.error(err)
    }
  }

  const fetchEstimates = async () => {
    try{
      const response = await viewEstimate();
      console.log(response.data)
      setEstimates(response.data)
    }catch(err){
      console.error(err)
    }
  }

  const fetchZones = async () => {
    try{
      const response = await viewZone();
      setZones(response.data)
    }catch(err){
      console.error(err);
    }
  }

  const handleAdd = async () => {
    if(!service.trim()){
      alert("Enter Service")
      return;
    }
    if(!quantity.trim()){
      alert("Enter Quantity")
      return
    }
    if(!costPerUnit.trim()){
      alert("Enter Cost Per Unit")
      return;
    }
    if(!deliveryDate.trim()){
      alert("Enter Delivery Date")
      return;
    }
    if(!deliveryDetails.trim()){
      alert("Enter Delivery Details")
      return;
    }
    if(!zoneId){
      alert("Select Zone")
      return;
    }
    try{
      const estimateData = {service, quantity, costPerUnit, deliveryDate, deliveryDetails, zoneId}
      await addEstimate(estimateData)
      setService("")
      setQuantity("")
      setCostPerUnit("")
      setDeliveryDate("")
      setDeliveryDetails("")
      setZoneId("")
      fetchCount()
      fetchEstimates()
    }catch(err){
      console.error(err)
    }
  }

  const handleEdit = (estimate) => {
    setEditId(estimate.id)
    setNewService(estimate.service)
    setNewQuantity(estimate.quantity)
    setNewCostPerUnit(estimate.costPerUnit)
    setNewDeliveryDate(estimate.deliveryDate)
    setNewDeliveryDetails(estimate.deliveryDetails)
    setNewZoneId(estimate.zoneId)
  }

  const handleUpdate = async () => {
    try{
      const estimateData = {service: newService, 
        quantity:newQuantity, 
        costPerUnit:newCostPerUnit, 
        deliveryDate: newDeliveryDate, 
        deliveryDetails: newDeliveryDetails, 
        zoneId: newZoneId}
      await updateEstimate(editId, estimateData)
      setEditId(null)
      setNewService("")
      setNewQuantity("")
      setNewCostPerUnit("")
      setNewDeliveryDate("")
      setNewDeliveryDetails("")
      setNewZoneId("")
      fetchEstimates()
      fetchCount()
    }catch(err){
      console.error(err)
    }
  }

  const handleCancel = () => {
    setEditId(null)
    setNewService("")
    setNewQuantity("")
    setNewCostPerUnit("")
    setNewDeliveryDate("")
    setNewDeliveryDetails("")
    setNewZoneId("")
  }

  const handleDelete = async (id) => {
    try{
      await deleteEstimate(id)
      fetchEstimates()
      fetchCount()
    }catch(err){
      console.error(err)
    }
  }

  useEffect(()=>{
    fetchCount();
    fetchEstimates();
    fetchZones();
  },[])

  return (
    <div className="m-4">

      <div className="d-flex flex-row gap-3">
        <div className="bg-success rounded p-4">
          <p className="text-white fs-5 fw-bold">Total Groups</p>
          <h4 className="text-white">{countEstimate}</h4>
        </div>
      </div>

      {/* add estimate */}
      <div className="mt-4 border rounded p-4 bg-light">
        <h5 className="mb-4">Add New Estimate</h5>

        <div className="row g-3 align-items-end">

          <div className="col-md-4">
            <label className="form-label">Service Details: </label>
            <input className=" form-control shadow-none" type="text" value={service} onChange={(e)=>setService(e.target.value)} />
          </div>

          <div className="col-md-4">
            <label className="form-label">Quantity: </label>
            <input className=" form-control shadow-none" type="number" value={quantity} onChange={(e)=>setQuantity(e.target.value)} />
          </div>

          <div className="col-md-4">
            <label className="form-label">Cost per unit: </label>
            <input className=" form-control shadow-none" type="number" value={costPerUnit} onChange={(e)=>setCostPerUnit(e.target.value)} />
          </div>

          <div className="col-md-4">
            <label className="form-label">Delivery Date: </label>
            <input className=" form-control shadow-none" type="date" value={deliveryDate} onChange={(e)=>setDeliveryDate(e.target.value)} />
          </div>

          <div className="col-md-4">
            <label className="form-label">Delivery Details: </label>
            <input className=" form-control shadow-none" type="text" value={deliveryDetails} onChange={(e)=>setDeliveryDetails(e.target.value)} />
          </div>

          <div className="col-md-4">
            <label className="form-label">Zone</label>
            <select className="form-select shadow-none" value={zoneId} onChange={(e)=>setZoneId(e.target.value)}>
              <option value="">Select Zone</option>
              {zones.map((zone)=>(
                <option key={zone.id} value={zone.id}>{zone.zoneName}</option>
              ))}
            </select>
          </div>

          <div className="col-md-3">
            <button className="btn btn-primary" onClick={handleAdd}>Add Estimate</button>
          </div>

        </div>
      </div>

      {/* table */}
      <div className="mt-3 p-4 border rounded bg-light">
        <h5 className="mb-4">All Estimates</h5>
        
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Group</th>
              <th>Chain ID</th>
              <th>Brand</th>
              <th>Zone</th>
              <th>Service Details</th>
              <th>Total Units</th>
              <th>Price Per Unit</th>
              <th>Total</th>
              <th width="180"></th>
            </tr>
          </thead>
          <tbody>
            {estimates.map((estimate)=>(
              <tr key={estimate.id}>
                <td>{estimate.id}</td>

                <td>{estimate.groupName}</td>

                <td>{estimate.chainId}</td>

                <td>{estimate.brandName}</td>

                <td>
                  {editId === estimate.id ? (
                    <select
                      className="form-select"
                      value={newZoneId}
                      onChange={(e) => setNewZoneId(e.target.value)}
                    >
                      {zones.map((zone)=>(
                        <option key={zone.id} value={zone.id}>
                          {zone.zoneName}
                        </option>
                      ))}
                    </select>
                  ) : (
                    estimate.zoneName
                  )}
                </td>

                <td>{editId === estimate.id ? 
                  (<input type="text" value={newService} className=" form-control shadow-none" onChange={(e)=>setNewService(e.target.value)}/>) 
                  : (estimate.service)}
                </td>

                <td>{editId === estimate.id ? 
                  (<input type="number" value={newQuantity} className=" form-control shadow-none" onChange={(e)=>setNewQuantity(e.target.value)}/>) 
                  : (estimate.quantity)}
                </td>

                <td>{editId === estimate.id ? 
                  (<input type="number" value={newCostPerUnit} className=" form-control shadow-none" onChange={(e)=>setNewCostPerUnit(e.target.value)}/>) 
                  : (estimate.costPerUnit)}
                </td>


                <td>{estimate.totalCost}</td>


                <td>
                  {editId === estimate.id ? (
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
                      <button className="btn btn-warning btn-sm me-2" onClick={()=>handleEdit(estimate)}>
                        Edit
                      </button>

                      <button className="btn btn-danger btn-sm" onClick={()=>handleDelete(estimate.id)}
                      disabled={!estimate.active}>
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

export default ManageEstimate
