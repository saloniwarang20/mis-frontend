import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import HeaderBar from "./HeaderBar"

const Layout = () => {
  return (
    <div className="container-fluid vh-100 bg-white p-0">
      <div className="row g-0 h-100">
        <Sidebar/>

        <main className="col-md-10 d-flex flex-column h-100"
          style={{marginLeft:"16.666667%", minHeight:"100vh"}}>
          <HeaderBar/>
          <div className="flex-grow-1 overflow-auto">
            <Outlet/>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout
