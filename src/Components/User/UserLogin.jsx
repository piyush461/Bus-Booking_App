import userImg from '../../../public/img/user.png';
import LoginForm from "../Login/LoginForm";

export default function UserLogin() {
  return (
    <div className="flex h-[85.5vh]">
      <aside className="">
        <center>
          <img className="h-40" src={userImg} alt="" />
          <br />
          <br />
          <h1 className="font-semibold">User Login Page</h1>
        </center>
      </aside>
      <LoginForm />
    </div>
  );
}
