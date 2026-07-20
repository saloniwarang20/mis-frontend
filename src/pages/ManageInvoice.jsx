import { useEffect, useState } from "react";
import { updateEstimate, viewEstimate } from "../services/estimateService";
import { createInvoice, deleteInvoice, updateInvoice, viewAllInvoices } from "../services/invoiceService";

const ManageInvoice = () => {
  const [estimates, setEstimates] = useState([]);
  const [invoices, setInvoices] = useState([]);

  const [estimateId, setEstimateId] = useState("");
  const [emailId, setEmailId] = useState("");
  const [balance, setBalance] = useState("");
  const [dateOfPayment, setDateOfPayment] = useState("");

  const [selectedEstimate, setSelectedEstimate] = useState(null);

  const [editId, setEditId] = useState(null);
  const [newEmail, setNewEmail] = useState("");

  const fetchEstimates = async () => {
    try{
        const response = await viewEstimate();
        setEstimates(response.data);
    }catch(error){
        console.error(error);
    }
  }

  const fetchInvoices = async () => {
    try{
        const response = await viewAllInvoices();
        console.log(response.data)
        setInvoices(response.data);
    }catch(error){
        console.error(error);
    }
  }

  const handleEstimateChange = (id) => {
    setEstimateId(id);
    const estimate = estimates.find(
        e => e.id === Number(id)
    );
    setSelectedEstimate(estimate);
  }

  const handleAdd = async () => {
    if(!estimateId){
        alert("Select Estimate");
        return;
    }
    if(!emailId.trim()){
        alert("Enter Email");
        return;
    }
    try{
        const invoiceData = {estimateId,emailId,balance,dateOfPayment}
        await createInvoice(invoiceData);
        setEstimateId("");
        setEmailId("");
        setBalance("");
        setDateOfPayment("");
        setSelectedEstimate(null);
        fetchInvoices();
    }catch(error){
        console.error(error);
    }
  }

  const handleEdit = (invoice) => {
    setEditId(invoice.id);
    setNewEmail(invoice.emailId);
  }

  const handleUpdate = async () => {
    try{
        await updateInvoice(editId,{
            emailId:newEmail
        });
        setEditId(null);
        setNewEmail("");
        fetchInvoices();
    }catch(error){
        console.error(error);
    }
  }

  const handleDelete = async(id)=>{
    try{
      await deleteInvoice(id);
      fetchInvoices();
    }catch(error){
      console.error(error);
    }
  }

  useEffect(()=>{
    fetchEstimates();
    fetchInvoices();
  },[])

  return (
  <div className="m-4">

      <div className="border rounded p-4 bg-light">

          <h4 className="mb-4">Create Invoice</h4>

          <div className="row g-3">

              {/* Select Estimate */}

              <div className="col-md-4">
                  <label className="form-label">Estimate</label>

                  <select
                      className="form-select"
                      value={estimateId}
                      onChange={(e)=>handleEstimateChange(e.target.value)}
                  >

                      <option value="">Select Estimate</option>

                      {estimates.map((estimate)=>(
                          <option
                              key={estimate.id}
                              value={estimate.id}
                          >
                              Estimate #{estimate.id}
                          </option>
                      ))}

                  </select>

              </div>

              {/* Invoice No */}

              <div className="col-md-4">
                  <label>Invoice No</label>

                  <input
                      className="form-control"
                      value={selectedEstimate?.invoiceNo || ""}
                      disabled
                  />
              </div>

              {/* Estimate */}

              <div className="col-md-4">

                  <label>Estimate ID</label>

                  <input
                      className="form-control"
                      value={selectedEstimate?.id || ""}
                      disabled
                  />

              </div>

              {/* Chain */}

              <div className="col-md-4">

                  <label>Chain</label>

                  <input
                      className="form-control"
                      value={selectedEstimate?.chainName || ""}
                      disabled
                  />

              </div>

              {/* Brand */}

              <div className="col-md-4">

                  <label>Brand</label>

                  <input
                      className="form-control"
                      value={selectedEstimate?.brandName || ""}
                      disabled
                  />

              </div>

              {/* Group */}

              <div className="col-md-4">

                  <label>Group</label>

                  <input
                      className="form-control"
                      value={selectedEstimate?.groupName || ""}
                      disabled
                  />

              </div>

              {/* Zone */}

              <div className="col-md-4">

                  <label>Zone</label>

                  <input
                      className="form-control"
                      value={selectedEstimate?.zoneName || ""}
                      disabled
                  />

              </div>

              {/* Service */}

              <div className="col-md-4">

                  <label>Service</label>

                  <input
                      className="form-control"
                      value={selectedEstimate?.serviceDetails || ""}
                      disabled
                  />

              </div>

              {/* Quantity */}

              <div className="col-md-2">

                  <label>Quantity</label>

                  <input
                      className="form-control"
                      value={selectedEstimate?.quantity || ""}
                      disabled
                  />

              </div>

              {/* Cost */}

              <div className="col-md-2">

                  <label>Cost Per Unit</label>

                  <input
                      className="form-control"
                      value={selectedEstimate?.costPerUnit || ""}
                      disabled
                  />

              </div>

              {/* Total */}

              <div className="col-md-4">

                  <label>Total Amount</label>

                  <input
                      className="form-control"
                      value={selectedEstimate?.totalAmount || ""}
                      disabled
                  />

              </div>

              {/* Balance */}

              <div className="col-md-4">

                  <label>Balance</label>

                  <input
                      className="form-control"
                      value={balance}
                      onChange={(e)=>setBalance(e.target.value)}
                  />

              </div>

              {/* Date */}

              <div className="col-md-4">

                  <label>Date Of Payment</label>

                  <input
                      type="date"
                      className="form-control"
                      value={dateOfPayment}
                      onChange={(e)=>setDateOfPayment(e.target.value)}
                  />

              </div>

              {/* Delivery */}

              <div className="col-md-6">

                  <label>Delivery Details</label>

                  <textarea
                      className="form-control"
                      rows="3"
                      value={selectedEstimate?.deliveryDetails || ""}
                      disabled
                  />

              </div>

              {/* Email */}

              <div className="col-md-6">

                  <label>Email</label>

                  <input
                      type="email"
                      className="form-control"
                      value={emailId}
                      onChange={(e)=>setEmailId(e.target.value)}
                  />

              </div>

              <div className="col-md-12">

                  <button
                      className="btn btn-primary"
                      onClick={handleAdd}
                  >
                      Generate Invoice
                  </button>

              </div>

          </div>

      </div>

      {/* TABLE */}

      <div className="border rounded bg-light mt-4 p-4">

          <h4 className="mb-3">All Invoices</h4>

          <table className="table table-hover">

              <thead>
                  <tr>
                      <th>ID</th>
                      <th>Invoice</th>
                      <th>Estimate</th>
                      <th>Chain ID</th>
                      <th>Brand</th>
                      <th>Zone</th>
                      <th>Total</th>
                      <th>Email</th>
                      <th>Actions</th>
                  </tr>
              </thead>

              <tbody>
              {invoices.map((invoice)=>(

                  <tr key={invoice.id}>

                      <td>{invoice.id}</td>

                      <td>{invoice.invoiceNo}</td>

                      <td>{invoice.estimateId}</td>

                      <td>{invoice.chainId}</td>

                      <td>{invoice.brandName}</td>

                      <td>{invoice.zoneName}</td>

                      <td>{invoice.amountPayable}</td>

                      <td>

                          {editId===invoice.id ?

                          <input
                              className="form-control"
                              value={newEmail}
                              onChange={(e)=>setNewEmail(e.target.value)}
                          />

                          :

                          invoice.emailId

                          }

                      </td>

                      <td>

                          {editId===invoice.id ?

                          <>

                          <button
                          className="btn btn-success btn-sm me-2"
                          onClick={handleUpdate}
                          >
                              Save
                          </button>

                          <button
                          className="btn btn-secondary btn-sm"
                          onClick={()=>setEditId(null)}
                          >
                              Cancel
                          </button>

                          </>

                          :

                          <>

                          <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={()=>handleEdit(invoice)}
                          >
                              Edit
                          </button>

                          <button
                          className="btn btn-danger btn-sm"
                          onClick={()=>handleDelete(invoice.id)}
                          >
                              Delete
                          </button>

                          </>

                          }

                      </td>

                  </tr>

              ))}

              </tbody>

          </table>

      </div>

  </div>
  );
}

export default ManageInvoice
