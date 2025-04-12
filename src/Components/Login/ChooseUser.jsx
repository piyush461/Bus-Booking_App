import { Link } from "react-router-dom";
import adminImg from "../../../public/img/admin.png";
import userImg from "../../../public/img/user.png";

export default function ChooseUser() {
  return (
    <div className="flex justify-center gap-10 items-center bg-black flex-1">
        <Link className="flex flex-col items-center justify-around h-80 py-6 px-10 rounded-xl bg-white hover:bg-emerald-500 transition-all duration-300 shadow-lg hover:shadow-md shadow-emerald-400"  to="/adminlogin">
          <img className="h-[70%]" src={adminImg} alt="" />
          <span className="text-black text-2xl font-bold">ADMIN</span>
        </Link>
        <Link className="flex flex-col items-center font-bold justify-around  h-80 py-6 px-10 bg-white rounded-xl hover:bg-emerald-500 transition-all duration-300 shadow-lg hover:shadow-md shadow-emerald-400" to="/userlogin">
          <img className="h-[70%]" src={userImg} alt="" />
          <span className="text-2xl text-black">USER</span>
        </Link>
    </div>
  );
}
