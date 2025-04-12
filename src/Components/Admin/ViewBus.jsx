import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Main/Loader";

const ViewBus = () => {
  const [bus, setBus] = useState('');
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    setTimeout(() => {
      axios
        .get(`https://bus-booking-app-data.onrender.com/bus/${id}`)
        .then((res) => setBus(res.data))
        .catch((err) => console.log(err));
    }, 0);
  }, [id]);

  console.log(bus.thumbnail);

  return !bus ? (<Loader />) : (
    <div className="bg-emerald-400 flex-1 h-[86.2vh] items-center flex overflow-clip">
      <div className="h-[100%] p-10 flex items-center w-[40%]">
        <img
          className="bg-cover"
          src="https://images.indianexpress.com/2020/12/BMTC-AC-bus.jpeg?w=640"
          alt=""
        />
      </div>
      <div className="w-[2px] rounded-4xl bg-black h-[0%] seperator"></div>
      <div className="h-[100%] flex flex-col gap-5 flex-1 p-16 font-semibold">
        <div className="flex justify-between items-center">
          <span className="text-2xl text-emerald-900 font-bold">
            {bus.name}
          </span>
          <span className="text-gray-700 bg-emerald-300 rounded-lg px-2 py-1 ">
            {bus.number}
          </span>
        </div>
        <div className="flex justify-center gap-3 text-slate-800 font-semibold text-xl py-1 items-center">
          <span>{bus.to}</span>
          <span className="font-bold text-2xl">→</span>
          <span>{bus.from}</span>
        </div>
        <div className="flex items-center text-green-700 font-bold font-mono justify-between w-40">
          <span>DEPARTURE</span>
          <span>{bus.departure}</span>
        </div>
        <div className="flex items-center text-green-700 font-bold font-mono justify-between w-40">
          <span>Arrival</span>
          <span className="font-bold">{bus.arrival}</span>
        </div>
        <div className="flex text-indigo-500 font-mono justify-between items-center w-24 ">
          <span>Seats</span>
          <span>{bus.seats}</span>
        </div>
        <div
          className={`${
            !(bus.type == "Non-AC") ? "bg-blue-500" : "bg-[#EA580C]"
          } p-2 px-3 text-white w-fit rounded-lg`}>
          {bus.type}
        </div>
        <div className="text-gray-700 italic px-2 py-2 max-h-28">
          {bus.description}
        </div>
      </div>
    </div>
  );
};

export default ViewBus;
