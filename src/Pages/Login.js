import { Link,useNavigate } from "react-router-dom";
import { useState,useContext } from "react";
import { postRequest,baseUrl } from "../utils/service";
import AuthContext from "../Context/AuthContext";
import Loader from "../Components/Loader/Loader";



const Login = ()=>{
 const navigate = useNavigate();
  const {Setuser,loading,setLoading} = useContext(AuthContext);
 
  const [logError,setlogError] = useState({error:false,message:""}); 
  const [loginInfo,setLoginInfo] = useState({email:"",password:""});

  async function handleSubmit(e){
    setLoading(true);
    e.preventDefault();
    let response = await postRequest(`${baseUrl}/user/login`,loginInfo);
   //  console.log(response);
    if(response.error){
       setlogError(response);
       setLoading(false);
    }
    else{
     Setuser(response);
     setlogError({error:false,message:""});
     setLoading(false)
      navigate("/chat")
    }
   }
   if(loading){
     return (
      <Loader/>
     )
   }
else{
    return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chat Easy</span>
        <span className="title">Login</span>
        <form noValidate onSubmit={handleSubmit} >
          <input type="email" placeholder="email" onChange={(e)=>{setLoginInfo({...loginInfo,email:e.target.value})}}/>
          <input type="password" placeholder="password" onChange={(e)=>{setLoginInfo({...loginInfo,password:e.target.value})}} />
          <button>Sign in</button>
        </form>
        <p>You don't have an account? <Link to="/register">Register</Link></p>
        {logError.error && <p style={{color:"red"}} >{logError.message}</p>}
      </div>
    </div>
    )
}
}

export default Login;