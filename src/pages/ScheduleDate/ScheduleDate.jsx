import React, { useEffect, useState } from "react";
import "./scheduleDate.scss";
import { publicRequest } from "../../requestMethod";
import axios from "axios";
const ScheduleDate = () => {
  const [enableModelCreate, setEnableModelCreate] = useState(false);

  const [sessionDateName, setSessionDateName] = useState("");
  const [travelScheduleId,setTravelScheduleId] = useState(null); 
  const [scheduleDate,setScheduleDate] = useState([]); 
  const handleShowModelCreate = () => {
    setEnableModelCreate(true);
  };

  const handleCloseForm = () => {
    setEnableModelCreate(false);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/v1/travel/schedule/date", {
        sessionDateName,
        travelScheduleId
      });
     setScheduleDate(schedule=>[...schedule,response.data?.data]); 
     setEnableModelCreate(false); 
    } catch (error) {
      console.log(error);
    }
  };

  const getScheduleDate = async()=>{
    try {
      const response = await axios.get('http://localhost:8080/api/v1/travel/schedule/date')
      setScheduleDate(response.data?.data); 
    } catch (error) {
      
    }
  }

  const handleDelete = async(id)=>{
    try {
      await axios.delete(`http://localhost:8080/api/v1/travel/schedule/date/${id}`)
      getScheduleDate(); 
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    getScheduleDate(); 
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
            value={sessionDateName}
            onChange={(e) => setSessionDateName(e.target.value)}
            placeholder="Session date name..."
          />
           <input
            type="number"
            value={travelScheduleId}
            onChange={(e) => setTravelScheduleId(e.target.value)}
            placeholder="Travel Schedule id ..."
          />
          <button type="submit">Create</button>
        </form>
      </div>

      <div className="category-update-model"></div>

      <button className="category-create-btn" onClick={handleShowModelCreate}>
        CREATE
      </button>
      <h1>SCHEDULE DATE</h1>
      <table id="customers">
        <tr>
          <th>Session Date</th>
          <th>Travel Schedule Id</th>
          <th style={{width:"20%"}}>Options</th>
        </tr>
        {scheduleDate && scheduleDate.map(item=>{
          return (
        <tr>
          <td>{item.sessionDateName}</td>
          <td>{item.travelScheduleId}</td>
          <td>
            <button className="btn-update">Update</button>
                <button className="btn-delete" onClick={()=>handleDelete(item.id)}>Delete</button>
          </td>
        </tr>
          )
        })}
        
      </table>
    </div>
  );
};

export default ScheduleDate;
