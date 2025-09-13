"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminData() {
  const [jsonData, setjsonData] = useState<any>(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await axios.post("http://localhost:3001/adminP/getAdmin");
      console.log("RAW RESPONSE:", response.data);
      setjsonData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  // ✅ Delete admin function
  async function handleDelete(id: number) {
    try {
      await axios.delete(`http://localhost:3001/adminP/deleteAdmin/${id}`);
      alert(`Admin with ID ${id} has been kicked out 🚫`);
      // refresh data after delete
      fetchData();
    } catch (error) {
      console.error("Failed to delete admin:", error);
      alert("Error: Could not delete admin.");
    }
  }

  const printArray = (jsonData: any) => {
    return jsonData.map((item: any, index: number) => (
      <div
        key={index}
        className="bg-white shadow-md rounded-lg p-4 mb-6 w-[400px] text-center"
      >
        <img
          src={"http://localhost:3001/adminP/getimage/" + item.photo}
          alt={item.name}
          className="w-40 h-40 object-cover mx-auto rounded-md border-2 border-blue-500"
        />
        <h2 className="text-lg font-semibold text-blue-700 mt-2">
          ID: {item.id}
        </h2>
        <h2 className="text-md text-gray-700">Name: {item.name}</h2>
        <h2 className="text-md text-gray-700">User Name: {item.uname}</h2>
        <h2 className="text-md text-gray-700">Address: {item.add}</h2>
        <hr className="my-3 border-blue-300" />

        {/* 🔴 Kick Out Button */}
        <button
          className="btn-primary bg-red-600 hover:bg-red-700 mt-3"
          onClick={() => handleDelete(item.id)}
        >
          Kick Out
        </button>
      </div>
    ));
  };

  const printObject = (jsonData: any) => {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 text-center w-[400px]">
        <img
          src={"http://localhost:3001/adminP/getimage/" + jsonData.photo}
          className="w-40 h-40 object-cover mx-auto rounded-md border-2 border-blue-500"
        />
        <h2 className="text-lg font-semibold text-blue-700 mt-2">
          ID: {jsonData.id}
        </h2>
        <h2 className="text-md text-gray-700">Name: {jsonData.name}</h2>
        <h2 className="text-md text-gray-700">Email: {jsonData.email}</h2>

        {/* 🔴 Kick Out Button */}
        <button
          className="btn-primary bg-red-600 hover:bg-red-700 mt-3"
          onClick={() => handleDelete(jsonData.id)}
        >
          Kick Out
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-6">
      {!jsonData ? (
        <p className="text-lg text-blue-600 font-semibold">Loading...</p>
      ) : Array.isArray(jsonData) ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {printArray(jsonData)}
        </div>
      ) : (
        printObject(jsonData)
      )}
    </div>
  );
}
