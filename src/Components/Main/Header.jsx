import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    let navigate = useNavigate();
    function navigateTo(location){
        navigate(location)
        console.log(navigate(location));
    }
  return (
    <div className="flex justify-between items-center px-10 py-5 bg-black">
      <div>
        <button onClick={()=>navigateTo('/')} className="italic cursor-pointer font-mono font-bold text-3xl text-emerald-400">
          Green<span className="text-white">Bus</span>
        </button>
      </div>
      <div>
        <Link to="/chooseuser" className="outline-2 font-bold hover:outline-white cursor-pointer !text-emerald-400 outline-emerald-400 hover:!text-white px-3 py-2 ">
          Account
        </Link>
      </div>
    </div>
  );
};

export default Header;
