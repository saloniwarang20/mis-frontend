import { useLocation, useNavigate } from "react-router-dom"

const HeaderBar = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const titles = {
        "/dashboard":"Dashboard",
        "/manage-group":"Manage Groups Section",
        "/manage-chain":"Manage Chains Section",
        "/manage-brand":"Manage Brands Section",
        "/manage-subzone":"Manage Sub Zones Section",
        "/manage-estimate":"Manage Estimate Section",
        "/manage-invoke":"Manage Invoke Section"
    }

    const handleLogout = () =>{
      localStorage.removeItem("token");
      navigate("/");
    }
  return (
    <div className="position-sticky top-0 p-4 d-flex justify-content-between bg-white"
      style={{zIndex:1000}}>
      <h2>Invoice | {" "}
        <span className="text-secondary">{titles[pathname]}</span></h2>

      <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default HeaderBar
