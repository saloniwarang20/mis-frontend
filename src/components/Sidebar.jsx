import { Link, useLocation } from "react-router-dom"

const Sidebar = () => {

  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const menuItems = [
    {path: "/dashboard",label: "Dashboard"},
    {path: "/manage-group",label:"Manage Groups"},
    {path: "/manage-chain",label:"Manage Chains"},
    {path: "/manage-brand",label:"Manage Brands"},
    {path: "/manage-subzone",label:"Manage Sub Zones"},
    {path: "/manage-estimate",label:"Manage Estimate"},
    {path: "/manage-invoice",label:"Manage Invoice"}
  ]
  return (
    <div className="col-md-2 bg-primary text-white vh-100 position-fixed start-0 top-0 d-flex flex-column align-items-center pt-5 p-4"
    style={{width:"16.666667%"}}>

      {menuItems.map((item)=>(
        <Link
          key={item.path}
          to={item.path}
          className={`text-decoration-none mt-4 fs-6 w-100 py-2 text-center
            ${isActive(item.path) ? "bg-white text-primary rounded": "text-white"}`}
          >
            {item.label}
        </Link>
      ))}
        
        
    </div>
  )
}

export default Sidebar
