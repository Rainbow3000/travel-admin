import React, { useEffect, useState } from "react";
import "./travelSchedule.scss";
import { publicRequest } from "../../requestMethod";
import axios from "axios";
const TravelSchedule = () => {
  const [enableModelCreate, setEnableModelCreate] = useState(false);

  const [dateName, setDateName] = useState("");
  const [travelId,setTravelId] = useState(null); 

  const [schedule,setSchedule] = useState([]); 

  const handleShowModelCreate = () => {
    setEnableModelCreate(true);
  };

  const handleCloseForm = () => {
    setEnableModelCreate(false);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
     const response =  await axios.post("http://localhost:8080/api/v1/travel/schedule", {
        dateName,
        travelId
      });

      setSchedule(tSchedule=>[...tSchedule,response.data?.data])
      setEnableModelCreate(false); 
      getSchedule(); 
    } catch (error) {
      console.log(error);
    }
  };

  const getSchedule = async()=>{
    try {
      const response = await axios.get("http://localhost:8080/api/v1/travel/schedule"); 
      setSchedule(response.data?.data); 
    } catch (error) {
      
    }
  }

  const handleDelete = async(id)=>{
    try {
      await axios.delete(`http://localhost:8080/api/v1/travel/schedule/${id}`);
      getSchedule(); 
    } catch (error) {
      
    }
  }


  useEffect(()=>{
    getSchedule(); 
  },[])

  return (
    <div className="category-container">
      <div
        className="category-overlay"
        onClick={handleCloseForm}
        style={{ display: enableModelCreate === true && "block" }}
      ></div>
      <div
        style={{ display: enableModelCreate === true && "flex" }}
        className="category-create-model"
      >
        <h1>CREATE</h1>
        <form action="#" onSubmit={handleSubmitForm}>
          <input
            type="text"
            value={dateName}
            onChange={(e) => setDateName(e.target.value)}
            placeholder="Date name..."
          />
           <input
            type="number"
            value={travelId}
            onChange={(e) => setTravelId(e.target.value)}
            placeholder="Travel id ..."
          />
          <button type="submit">Create</button>
        </form>
      </div>

      <div className="category-update-model"></div>

      <button className="category-create-btn" onClick={handleShowModelCreate}>
        CREATE
      </button>
      <h1>TRAVEL SCHEDULE</h1>
      <table id="customers">
        <tr>
          <th>Date Name</th>
          <th>Travel Id</th>
          <th style={{width:"20%"}}>Options</th>
        </tr>
        {
          schedule && schedule.map(item=>{
            return (
              <tr>
                <td>{item.dateName}</td>
                <td>{item.travelId}</td>
                <td>
                  <button className="btn-update">Update</button>
                  <button className="btn-delete" onClick={()=>handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            )
          })
        }
        
      </table>
    </div>
  );
};

export default TravelSchedule;
