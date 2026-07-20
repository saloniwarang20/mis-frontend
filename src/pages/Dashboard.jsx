import { useEffect, useState } from "react";
import { viewAllGroup } from "../services/groupService";
import { viewAllChain } from "../services/chainService";
import { viewBrand } from "../services/brandService";
import {  viewZone } from "../services/zoneService";
import { viewEstimate } from "../services/estimateService";
import { viewAllInvoices } from "../services/invoiceService";

const Dashboard = () => {

    const [groupCount,setGroupCount] = useState(0);
    const [chainCount,setChainCount] = useState(0);
    const [brandCount,setBrandCount] = useState(0);
    const [zoneCount,setZoneCount] = useState(0);
    const [estimateCount,setEstimateCount] = useState(0);
    const [invoiceCount,setInvoiceCount] = useState(0);

    const [estimates,setEstimates] = useState([]);
    const [invoices,setInvoices] = useState([]);

    const [revenue,setRevenue] = useState(0);

    useEffect(()=>{
        loadDashboard();
    },[]);

    const loadDashboard = async()=>{

        try{

            const groups = await viewAllGroup();
            setGroupCount(groups.data.length);

            const chains = await viewAllChain();
            setChainCount(chains.data.length);

            const brands = await viewBrand();
            setBrandCount(brands.data.length);

            const zones = await viewZone();
            setZoneCount(zones.data.length);

            const estimatesRes = await viewEstimate();
            setEstimateCount(estimatesRes.data.length);
            setEstimates(estimatesRes.data.slice(-5).reverse());

            const invoicesRes = await viewAllInvoices();
            setInvoiceCount(invoicesRes.data.length);
            setInvoices(invoicesRes.data.slice(-5).reverse());

            let total = 0;
            invoicesRes.data.forEach(inv=>{
                total += inv.amountPayable;
            });

            setRevenue(total);

        }catch(err){
            console.log(err);
        }
    }

    return (

    <div className="container-fluid mt-4">

      <h2 className="mb-4">
      Dashboard
      </h2>

    <div className="row g-3">

    <div className="col-md-3">
    <div className="card bg-success text-white">
    <div className="card-body">
    <h4>{groupCount}</h4>
    <p>Total Groups</p>
    </div>
    </div>
    </div>

    <div className="col-md-3">
    <div className="card bg-warning text-white">
    <div className="card-body">
    <h4>{chainCount}</h4>
    <p>Total Chains</p>
    </div>
    </div>
    </div>

    <div className="col-md-3">
    <div className="card bg-primary text-white">
    <div className="card-body">
    <h4>{brandCount}</h4>
    <p>Total Brands</p>
    </div>
    </div>
    </div>

    <div className="col-md-3">
    <div className="card bg-info text-white">
    <div className="card-body">
    <h4>{zoneCount}</h4>
    <p>Total Zones</p>
    </div>
    </div>
    </div>

    <div className="col-md-4 mt-3">
    <div className="card bg-secondary text-white">
    <div className="card-body">
    <h4>{estimateCount}</h4>
    <p>Total Estimates</p>
    </div>
    </div>
    </div>

    <div className="col-md-4 mt-3">
    <div className="card bg-danger text-white">
    <div className="card-body">
    <h4>{invoiceCount}</h4>
    <p>Total Invoices</p>
    </div>
    </div>
    </div>

    <div className="col-md-4 mt-3">
    <div className="card bg-dark text-white">
    <div className="card-body">
    <h4>₹ {revenue}</h4>
    <p>Total Revenue</p>
    </div>
    </div>
    </div>

    </div>

    <div className="card mt-5">

    <div className="card-header">
    Recent Estimates
    </div>

    <div className="card-body">

    <table className="table table-bordered">

    <thead>

    <tr>
    <th>ID</th>
    <th>Company</th>
    <th>Brand</th>
    <th>Zone</th>
    <th>Total</th>
    </tr>

    </thead>

    <tbody>

    {
    estimates.map(est=>(
    <tr key={est.id}>
    <td>{est.id}</td>
    <td>{est.chainName}</td>
    <td>{est.brandName}</td>
    <td>{est.zoneName}</td>
    <td>₹ {est.totalCost}</td>
    </tr>
    ))
    }

    </tbody>

    </table>

    </div>

    </div>

    <div className="card mt-4">

    <div className="card-header">
    Recent Invoices
    </div>

    <div className="card-body">

    <table className="table table-bordered">

    <thead>

    <tr>
    <th>Invoice</th>
    <th>Company</th>
    <th>Brand</th>
    <th>Total</th>
    <th>Balance</th>
    </tr>

    </thead>

    <tbody>

    {
    invoices.map(inv=>(
    <tr key={inv.id}>
    <td>{inv.invoiceNo}</td>
    <td>{inv.companyName}</td>
    <td>{inv.brandName}</td>
    <td>₹ {inv.amountPayable}</td>
    <td>₹ {inv.balance}</td>
    </tr>
    ))
    }

    </tbody>

    </table>

    </div>

    </div>

    </div>

        );
};

export default Dashboard;