import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const AdminRegister = () => {
  return (
    <div className="bg-emerald-500 rounded-br-[600px] flex-1 flex max-md:items-center pl-26">
      <div className="max-md:hidden">
        <img className="h-[90vh]" src="../img/Ravatar.png" alt="" />
      </div>
      <AdminRegisterForm />
    </div>
  );
};

export default AdminRegister;

export const AdminRegisterForm = () => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerData, setRegisterData] = useState({});
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    axios
      .get("https://bus-booking-app-data.onrender.com/admins")
      .then((res) => setAdmins(res.data))
      .catch((err) => console.log(err));
  }, []);

  console.log("Admin data : " + admins);

  function changeHandler(e) {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  }
  console.log(registerData);

  const { username, email, password } = registerData;

  function submitHandler(e) {
    e.preventDefault();

    console.log(admins);

    const hasUsername = admins.filter(
      (admin) => admin.username === username.toLowerCase()
    );

    const hasEmail = admins.filter(
      (admin) => admin.email === email.toLowerCase()
    );
    console.log("email : " + hasEmail);
    console.log("username : " + hasUsername);

    if (password !== confirmPassword) {
      toast.warn("Passwords do not match!");
      return;
    } else if (hasUsername.length > 0) {
      toast.warn("Username already taken!");
      return;
    } else if (hasEmail.length > 0) {
      toast.warn("Email already exists!");
      return;
    } else
      toast.promise(
        new Promise((resolve, reject) => {
          setTimeout(() => {
            axios
              .post("https://bus-booking-app-data.onrender.com/admins", registerData)
              .then((res) => {
                console.log(res.data);
                resolve(res.data);
              })
              .catch((err) => {
                console.log(err);
                reject("Error during registration");
              });
          }, 2000);
        }),
        {
          pending: "Registering user...",
          success: "User registered successfully! 🎉",
          error: "Try again after sometime",
        }
      );

    setConfirmPassword("");
    setRegisterData({
      username: "",
      email: "",
      password: "",
    });
  }

  return (
    <div className="w-[40%] flex items-center justify-center">
      <form
        onSubmit={submitHandler}
        action=""
        className="font-semibold flex flex-col justify-center px-8 py-2 w-[70%] bg-white rounded-2xl loginContainer">
        <center className="font-bold text-blue-500 text-2xl">Register</center>
        <label className=" mb-1" htmlFor="">
          Username
        </label>
        <input
          value={registerData.username}
          name="username"
          onChange={changeHandler}
          placeholder="Enter username"
          className="outline-blue-400 font-semibold placeholder:font-semibold border border-gray-300 rounded-lg p-2"
          type="text"
        />
        <label className="mt-3 mb-1" htmlFor="">
          Email
        </label>
        <input
          value={registerData.email}
          name="email"
          onChange={changeHandler}
          placeholder="Enter email"
          className="border outline-blue-400 font-semibold placeholder:font-semibold  border-gray-300 rounded-lg p-2"
          type="text"
        />
        <label className="mt-3 mb-1" htmlFor="">
          Password
        </label>
        <input
          value={registerData.password}
          name="password"
          onChange={changeHandler}
          placeholder="Choose password"
          className="placeholder:font-semibold font-semibold outline-blue-400 border border-gray-300 rounded-lg p-2"
          type="text"
        />
        <label className="mt-3 mb-1" htmlFor="">
          Confirm password
        </label>
        <input
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          placeholder="Enter password again"
          className="border outline-blue-400 font-semibold placeholder:font-semibold  border-gray-300 rounded-lg p-2"
          type="text"
        />
        <button className="bg-blue-500 my-3 hover:bg-blue-600 font-semibold text-white py-3 px-4 rounded-2xl">
          Sign Up
        </button>
        <center className="font-semibold">
          Have an account? <Link className="!text-blue-300 hover:!text-blue-500" to="/adminlogin">Login</Link>
        </center>
      </form>
    </div>
  );
};
