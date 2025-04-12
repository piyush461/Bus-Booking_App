import adminImg from "../../../public/img/admin.png";
import AdminLoginForm from "../Login/AdminLoginForm";

export default function AdminLogin() {
  
  return(
    <div className="flex justify-between w-[100%] flex-1">
      <div className="w-[25%] p-10">
        <img src={adminImg} alt="" />
        <center>
          <h1>Admin Login page</h1>
        </center>
      </div>
      <div className="flex items-center justify-center w-[90%] h-[100%] rounded-bl-[500px] bg-emerald-500">
        <AdminLoginForm />
      </div>
    </div>
  );
}
