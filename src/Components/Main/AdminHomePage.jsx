import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const AdminHomePage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const logoutHandler = () => {
    localStorage.removeItem("user");
    navigate("/adminlogin");
  };

  const sidebar = [
    { name: "Dashboard", path: "/adminhomepage" },
    { name: "Add Bus", path: "/adminhomepage/addbus" },
  ];
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex flex-1">
      <div className="bg-emerald-600 text-2xl w-[17vw] font-bold flex flex-col items-center">
        <h1 className="py-2">
          Hi{" "}
          <span className="capitalize text-violet-900 ">{user.username}</span>
          <span className="animate-bounce  bold text-3xl inline-block">!</span>
        </h1>
        {sidebar.map((ele, index) => {
          return (
            <NavLink
              to={ele.path}
              className={`py-4 w-[100%] transition-all ease-in-out duration-200 text-center hover:bg-emerald-500 ${
                pathname == ele.path
                  ? "bg-emerald-500 !text-black"
                  : "!text-white"
              }`}
              key={index}>
              {ele.name}
            </NavLink>
          );
        })}

        <button
          onClick={logoutHandler}
          className="py-4 w-[100%] transition-all ease-in-out duration-200 text-center hover:bg-emerald-500 active:!text-black !text-white">
          Logout
        </button>
      </div>
      <div className="flex-1 h-[86.2vh]">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminHomePage;
