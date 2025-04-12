import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

const EditBus = () => {
  const [busData, setBusData] = useState({});
  const { id } = useParams();
  console.log("bus id: ", id);

  useEffect(() => {
    axios
      .get(`https://bus-booking-app-data.onrender.com/bus/${id}`)
      .then((res) => setBusData(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  console.log(busData);
  

  const handleChange = (e) => {
    setBusData({ ...busData, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const {
      thumbnail,
      name,
      number,
      from,
      to,
      departure,
      arrival,
      seats,
      type,
    } = busData;
    if (
      !thumbnail ||
      !name ||
      !number ||
      !from ||
      !to ||
      !departure ||
      !arrival ||
      !seats ||
      !type
    ) {
      toast.error("Please fill in all required fields!");
      return;
    }

    try {
      const response = await axios.put(
        `https://bus-booking-app-data.onrender.com/bus/${id}`,
        busData
      );
      toast.success("Details updated successfully!");
      console.log("Details updated successfully:", response.data);
    } catch (error) {
      toast.error("Error adding bus!");
      console.error("Error adding bus:", error);
    }
  }

  return (
    <div className=" flex-1 h-[86.2vh] bg-emerald-300">
      <h1 className="py-2 px-14 font-bold text-3xl bg-emerald-600">EDIT BUS</h1>
      <form
        onSubmit={handleSubmit}
        className="px-12 py-2 flex flex-wrap gap-2 font-semibold">
        <label className="flex justify-between items-center w-[45%] p-2">
          Bus Thumbnail:
          <input
            name="thumbnail"
            className="w-52 p-2 bg-white"
            type="url"
            value={busData.thumbnail}
            onChange={handleChange}
            required
          />
        </label>
        <label className="flex justify-between items-center w-[36.5%] p-2">
          Bus Name:
          <input
            name="name"
            className="bg-white w-52 p-2"
            type="text"
            value={busData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label className="flex justify-between items-center w-[45%] p-2">
          Bus Number:
          <input
            name="number"
            className="bg-white w-52 p-2"
            type="text"
            value={busData.number?.toUpperCase()}
            onChange={handleChange}
            required
          />
        </label>
        <label className="flex justify-between items-center w-[36.5%] p-2">
          From:
          <input
            name="from"
            className="bg-white w-52 p-2"
            type="text"
            value={busData.from}
            onChange={handleChange}
            required
          />
        </label>
        <label className="flex justify-between items-center w-[45%] p-2">
          To:
          <input
            name="to"
            className="bg-white w-52 p-2"
            type="text"
            value={busData.to}
            onChange={handleChange}
            required
          />
        </label>
        <label className="flex justify-between  items-center w-[36.5%] p-2">
          Departure:
          <input
            name="departure"
            className="bg-white w-52 p-2"
            type="time"
            value={busData.departure}
            onChange={handleChange}
            required
          />
        </label>
        <label className="flex justify-between items-center w-[45%] p-2">
          Arrival:
          <input
            name="arrival"
            className="bg-white w-52 p-2"
            type="time"
            value={busData.arrival}
            onChange={handleChange}
            required
          />
        </label>
        <label className="flex justify-between items-center w-[36.5%] p-2">
          No. of Seats:
          <input
            name="seats"
            className="bg-white w-52 p-2"
            type="number"
            min="1"
            value={busData.seats}
            onChange={handleChange}
            required
          />
        </label>
        <label className="flex justify-between items-center w-[45%] p-2">
          AC / Non-AC:
          <select
            name="type"
            className="bg-white w-52 p-2"
            value={busData.type}
            onChange={handleChange}
            required>
            <option value="">Select</option>
            <option value="AC">AC</option>
            <option value="Non-AC">Non-AC</option>
          </select>
        </label>
        <label className="flex justify-between items-center w-[45%] p-2">
          Description:
          <textarea
            name="description"
            className="bg-white min-w-72 min-h-16 resize-none p-2"
            value={busData.description}
            onChange={handleChange}
          />
        </label>
        <button
          type="submit"
          className="bg-blue-600 px-8 py-3 rounded-lg text-white cursor-pointer hover:bg-blue-700">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditBus;
