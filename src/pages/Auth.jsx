import { useState } from "react"
import { login,signup } from "../services/authService";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Auth = () => {
    const [state, setState] = useState("login");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleName = (e) => {
        setFullName(e.target.value)
    }
    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try{
            if(state === 'login'){
                const response = await login({ email, password});
                localStorage.setItem(
                    "token",
                    response.data
                )
                navigate("/dashboard")
            }else{
                await signup({fullName, email, password});
                setMessage("User registered successfully");
                setState("login")
            }
            
        }catch(e){
            alert(e?.response?.data || "Something went wrong");
        }finally{
            setLoading(false);
        }
        
    }
    
  return (
    <div className="container-fluid vh-100 bg-light">
        <div className="row h-100">


            {/* {message && (
                <div className="alert alert-success">
                    {message}
                </div>
            )} */}

            {/* banner */}
            <div className="col-md-6 bg-primary-subtle rounded-end-5 text-primary d-flex flex-column justify-content-center align-items-center ">
                <h2>MIS and Invoicing System</h2>
            </div>

            {/* form */}
            <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
                <h3 className="mb-3">{state === "login" ? "LOGIN" : "SIGNUP"}</h3>
                <form onSubmit={handleSubmit} className="w-50">

                    {/* full name */}
                   {state === 'signup' && (
                    <div className='mb-4 d-flex align-items-center gap-3 w-100'>
                        <img src={assets.person_icon} width="20" height="20"/>
                        <input 
                        onChange={handleName} value={fullName} 
                        className='form-control border-0 border-bottom border-2 shadow-none bg-transparent rounded-0' 
                        type="text" placeholder='Full Name' required/>
                    </div>
                   )}

                    {/* email */}
                    <div className='mb-4 d-flex align-items-center gap-3 w-100'>
                        <img src={assets.mail_icon} width="20" height="20"/>
                        <input 
                        onChange={handleEmail} value={email} 
                        className='form-control border-0 border-bottom border-2 shadow-none bg-transparent rounded-0' 
                        type="email" placeholder='Email' required/>
                    </div>

                    {/* password */}
                    <div className='mb-4 d-flex align-items-center gap-3 w-100'>
                        <img src={assets.lock_icon} width="20" height="20"/>
                        <input 
                        onChange={handlePassword} value={password} 
                        className='form-control border-0 border-bottom border-2 shadow-none bg-transparent rounded-0' 
                        type="password" placeholder='Password' required/>
                    </div>

                    {/* submit */}
                    <button className="btn btn-primary w-100" disabled={loading}>
                        {loading ? "Please Wait..." : state === 'login'
                                                        ? "LOGIN":"SIGNUP"}
                    </button>
                </form>

                {state === 'signup' ? 
                (<p className="mt-2 text-secondary">Already have an account?{" "}
                    <span onClick={()=>setState("login")} className="text-primary cursor-pointer">Login here</span>
                </p>)
                : (<p className="mt-2 text-secondary">Don't have an account?{" "}
                    <span onClick={()=>setState("signup")} className="text-primary cursor-pointer">Sign up</span>
                </p>)}
            </div>
        </div>
    </div>
  )
}

export default Auth
