import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function LoginForm() {
  const navigate = useNavigate();
  const [ loginData, setLoginData ] = useState({
    username:"",
    password:"",
  });

  useEffect(() => {
    if(localStorage.getItem('user')){
      navigate('/userhomepage')
    }
  }, [navigate])
  

  function handleChange(e){
    setLoginData({
      ...loginData, 
      [e.target.name] : e.target.value,
    })
    console.log(loginData.username, loginData.password);
    
  }
  

  async function submitHandler(e) {
    e.preventDefault();
    
    try{
      const { data: users } = await axios.get("https://bus-booking-app-data.onrender.com/users");
      console.log(users);
      
      const user = users.find((user)=> user.username.toLowerCase() === loginData.username.toLowerCase() && user.password === loginData.password
    );

    console.log(user);
    

    if(user){
      toast.success("Login successful");
      localStorage.setItem("user", JSON.stringify({...user, role: "user"}));
      navigate("/userhomepage",
        {
          replace:true
        }
      );
    } else{
      toast.warn("incorrecct login credentials");
    }
    } catch(err){
      toast.error("Something went wrong! Try again : ", err)
    }
  }

  return (
    <div className="w-[70%] flex justify-center items-center bg-emerald-500 rounded-bl-[600px]">
      <form
        onSubmit={submitHandler}
        className="rounded-2xl flex flex-col w-fit h-fit gap-3 justify-between p-5 bg-white ">
        <center>
          <h1 className="font-bold  text-blue-500 text-2xl">Sign in</h1>
        </center>
        <label className="font-medium">Username</label>
        <input
          placeholder="Enter username"
          value={loginData.username}
          onChange={handleChange}
          name="username"
          className="p-2 outline-blue-400 font-semibold border-[2px] border-gray-200  rounded-lg"
          type="text"
        />
        <label className="font-medium">Password</label>
        <input
          value={loginData.password}
          onChange={handleChange}
          name="password"
          placeholder="Enter Password"
          className="border-[2px] outline-blue-400 border-gray-200 p-2 font-semibold rounded-lg"
          type="password"
        />
        <span className="flex justify-between my-3 items-center gap-8">
          <button
            className=" bg-blue-600 text-white px-5 py-2 w-[40%] rounded-2xl hover:bg-blue-700 hover:cursor-pointer"
            type="submit">
            Sign In
          </button>
          <span className="font-semibold text-nowrap">New User?<Link className="!text-blue-400 hover:!text-blue-500" to="/registeruser"> Signup</Link></span>
        </span>
      </form>
    </div>
  );
}

export default LoginForm;
