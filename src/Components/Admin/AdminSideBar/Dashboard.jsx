import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../Main/Loader";

const Dashboard = () => {
  const [buses, setBuses] = useState("");
  const [change, setChange] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      axios
        .get("https://bus-booking-app-data.onrender.com/bus")
        .then((res) => setBuses(res.data))
        .catch((err) => console.log(err));
    }, 500);
  }, [change]);

  function deleteBus(e) {
    e.preventDefault();
    let id = e.target.id;

    axios
      .delete(`https://bus-booking-app-data.onrender.com/bus/${id}`)
      .then(() => {
        setBuses((prevBuses) => prevBuses.filter((bus) => bus.id !== id));
      })
      .catch((err) => console.log(err));
  }

  return !buses ? (
    <Loader />
  ) : buses.length === 0 ? (
    <div className="h-[86.2vh] flex items-center justify-center text-3xl text-gray-500">
      No buses available.
    </div>
  ) : (
    <div className="flex-1">
      <div className="flex bg-emerald-500 px-5 text-white">
        {buses.length > 0 &&
          Object.keys(buses[0]).map((key) =>
            key == "id" ||
            key == "description" ||
            key == "number" ||
            key == "seats" ||
            key == "type" ? (
              ""
            ) : (
              <div key={key} className="text-center flex-1 p-2 font-semibold">
                {key.toUpperCase()}
              </div>
            )
          )}
        <div className="flex-1 p-2"></div>
        <div className="flex-1 p-2"></div>
        <div className="flex-1 p-2"></div>
      </div>
      <div className="overflow-y-scroll h-[86.3vh] scrollbar-custom">
        {buses.map((bus) => (
          <div
            key={bus.id}
            className="bus-card flex items-center gap-2 px-5 bg-white text-gray-800">
            {Object.entries(bus).map(([key, value], i) =>
              key == "id" ||
              key == "description" ||
              key == "number" ||
              key == "seats" ||
              key == "type" ? null : key === "thumbnail" &&
                typeof value === "string" &&
                value.startsWith("http") ? (
                <img
                  key={i}
                  src={bus.thumbnail}
                  alt="Thumbnail"
                  className="h-20 p-2"
                />
              ) : (
                <div
                  key={i}
                  className="flex-1 gap-4 font-semibold text-center p-2 text-[14px]">
                  {value}
                </div>
              )
            )}
            <Link
              to={`viewbus/${bus.id}`}
              className="flex-1 py-2 px-3 text-sm outline-blue-500 !text-blue-500 font-bold outline-2 rounded-md text-center hover:outline-blue-300 cursor-pointer">
              View Bus
            </Link>
            <Link
              to={`editbus/${bus.id}`}
              className="flex-1 py-2 px-3 text-sm text-center !text-emerald-500 font-bold outline-emerald-500 outline-2 rounded-md hover:outline-emerald-300 cursor-pointer">
              Edit Bus
            </Link>
            <Link
              id={bus.id}
              onClick={(e) => deleteBus(e)}
              className="flex-1 py-2 px-3 text-sm text-center outline-red-500 hover:outline-red-300 outline-2 rounded-md cursor-pointer !text-red-500 font-bold">
              Delete Bus
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
