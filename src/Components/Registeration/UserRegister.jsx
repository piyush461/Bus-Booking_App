import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function UserRegister() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("https://bus-booking-app-data.onrender.com/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);
const [registerData, setRegisterData] = useState({
  username: "",
  email: "",
  password: "",
});
const [confirmPassword, setConfirmPassword] = useState("");

function handleChange(e) {
  setRegisterData({ ...registerData, [e.target.name]: e.target.value });
}

function submitHandler(e) {
  e.preventDefault();

  const { username, email, password } = registerData;

  const hasUsername = users.filter(
    (user) => user.username === username.toLowerCase()
  );

  const hasEmail = users.filter(
    (user) => user.email === email.toLowerCase()
  );

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
            .post("https://bus-booking-app-data.onrender.com/users", registerData)
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
    <div className="relative">
      {/* <div className="navPage flex justify-center items-center gap-20">
        <button className="bg-blue-700 px-4 py-2 rounded-xl hover:bg-blue-800 text-white font-semibold cursor-pointer">
          Back
        </button>
        <button className="bg-blue-700 px-4 py-2 rounded-xl hover:bg-blue-800 text-white font-semibold cursor-pointer">
          Go to sign-in page
        </button>
      </div> */}
      <div className="bg-emerald-500 w-[100%] px-16 h-[85.5vh] rounded-br-[500px] flex justify-start max-md:justify-center items-start">
        <img className="h-[100%] max-md:hidden" src="/img/Ravatar.png" alt="" />
        <form
          action=""
          onSubmit={submitHandler}
          className="bg-white flex flex-col py-2 px-10 w-[28vw] max-md:w-[70vw] mt-2 gap-1 rounded-3xl">
          <center>
            <h1 className="text-blue-500 font-bold text-2xl">Register</h1>
          </center>
          <label className="font-semibold" htmlFor="">
            Username
          </label>
          <input
            required
            className="p-2 border-[2px] outline-blue-400 border-gray-300 rounded-lg font-semibold"
            type="text"
            value={registerData.username}
            name="username"
            onChange={handleChange}
          />
          <label className="font-semibold" htmlFor="">
            Email
          </label>
          <input
            required
            className="p-2 border-[2px] outline-blue-400 border-gray-300 rounded-lg font-semibold"
            type="text"
            value={registerData.email}
            name="email"
            onChange={handleChange}
          />
          <label className="font-semibold" htmlFor="">
            Password
          </label>
          <input
            required
            className="p-2 border-[2px] outline-blue-400 border-gray-300 rounded-lg font-semibold"
            type="password"
            value={registerData.password}
            name="password"
            onChange={handleChange}
          />
          <label className="font-semibold" htmlFor="">
            Confirm password
          </label>
          <input
            required
            className="p-2 border-[2px] outline-blue-400 border-gray-300 rounded-lg font-semibold"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <center>
            <button
              type="submit"
              className="cursor-pointer bg-blue-500 w-full px-8 my-2 py-2 rounded-xl text-white font-medium">
              Sign Up
            </button>
          </center>
          <center className="font-semibold mb-2">
            Have an account?{" "}
            <Link
              className="!text-blue-400 hover:!text-blue-500"
              to="/userlogin">
              Login
            </Link>
          </center>
        </form>
      </div>
    </div>
  );
}
