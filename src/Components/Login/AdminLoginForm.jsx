import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminLoginForm = () => {
  let navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/adminhomepage");
    }
  }, [navigate]);

  function handleChange(e) {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  }

  async function submitHandler(e) {
    e.preventDefault();

    if (isLoading) return;

    setIsLoading(true);

    try {
      const { data: admins } = await axios.get("https://bus-booking-app-data.onrender.com/admins");

      const admin = admins.find(
        (admin) =>
          admin.username.toLowerCase() === loginData.username.toLowerCase() &&
          admin.password === loginData.password
      );

      if (admin) {
        toast.success("Login Successful");
        localStorage.setItem("user", JSON.stringify({ ...admin, role: "admin" }));
        navigate("/adminhomepage", { replace: true });
      } else {
        toast.warn("Incorrect login credentials");
      }
    } catch (error) {
      console.error("Error fetching admin data:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false); // stop loading regardless of outcome
    }
  }

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col py-6 w-[35%] gap-5 p-10 rounded-2xl loginContainer bg-white">
      <center>
        <h1 className="text-2xl font-bold text-blue-500">Login</h1>
      </center>
      <label className="mt-4 font-semibold">Username</label>
      <input
        value={loginData.username}
        placeholder="Enter your username"
        onChange={handleChange}
        name="username"
        className="mb-8 mt-5 outline-blue-400 font-semibold placeholder:font-semibold rounded-lg p-3 border border-gray-300"
        type="text"
      />
      <label className="font-semibold">Password</label>
      <input
        value={loginData.password}
        placeholder="Enter your password"
        onChange={handleChange}
        name="password"
        className="outline-blue-400 mb-8 mt-5 placeholder:font-semibold font-semibold rounded-lg p-3 border border-gray-300"
        type="password"
      />
      <span className="flex justify-between items-center">
        <button
          type="submit"
          disabled={isLoading}
          className={`${
            isLoading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          } py-[10px] font-semibold text-white px-4 rounded-2xl`}>
          Login
        </button>
        <span className="font-semibold">
          New admin?{" "}
          <Link className="hover:!text-blue-600 !text-blue-400" to="/adminregister">
            Sign up
          </Link>
        </span>
      </span>
    </form>
  );
};

export default AdminLoginForm;
