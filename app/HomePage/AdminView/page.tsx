'use client'
import Link from "next/link";
 import axios from 'axios'; 
import { useEffect, useState } from "react";
export default function AdminData(){
    const[jsonData,setjsonData]=useState(null);
   
    useEffect(() => {
    fetchData();
  }, []);
    async function fetchData(){
        try{
            const response= await axios.post('http://localhost:3001/adminP/getAdmin');
             console.log("RAW RESPONSE:", response.data);
            setjsonData(response.data);
            console.log(jsonData);
        }
        catch(error){
            console.log(error);
        }
        

    }
    const printArray=(jsonData:any)=>{
        return(
            jsonData.map((item:any,index:number)=>{
                return (
                    <div key={index}>
                    <img src={'http://localhost:3001/adminP/getimage/'+ item.photo}alt={item.name} width={200}/>
                    
              {/* http://localhost:3001/adminP/getimage/1756902636569-boff.jpg */}
                    <h2>ID: {item.id}</h2>
                    <h2>Name: {item.name}</h2>
                    <h2>User Name: {item.uname}</h2>
                    <h2>Address: {item.add}</h2>
                    <hr/>
                    </div>
                );
            })

        );
    }
     const printObject = (jsonData:any) => {
    return (
      <div>
        asdsd
        <img src={'http://localhost:3001/adminP/getimage/' + jsonData.photo} width={200} />
        <h2>id: {jsonData.id}</h2>
        <h2>name: {jsonData.name}</h2>
        <h2>email: {jsonData.email}</h2>
      </div>
    );
}
  

    return(
        <>
        {!jsonData ? <p>Loading...</p> : Array.isArray(jsonData) ? printArray(jsonData) : printObject(jsonData)}

        {/* {Array.isArray(jsonData) ? printArray(jsonData):printObject(jsonData)} */}
        </>
    )
}