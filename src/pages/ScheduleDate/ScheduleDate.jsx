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
      },{
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user"))?.accessToken || null
          }`,
        },
      });
     setScheduleDate(schedule=>[...schedule,response.data?.data]); 
     setEnableModelCreate(false); 
    } catch (error) {
      console.log(error);
    }
  };

  const getScheduleDate = async()=>{
    try {
      const response = await axios.get('http://localhost:8080/api/v1/travel/schedule/date',{
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user"))?.accessToken || null
          }`,
        },
      })
      setScheduleDate(response.data?.data); 
    } catch (error) {
      
    }
  }

  const handleDelete = async(id)=>{
    try {
      await axios.delete(`http://localhost:8080/api/v1/travel/schedule/date/${id}`,{
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user"))?.accessToken || null
          }`,
        },
      })
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
        <h1>TẠO</h1>
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
          <button type="submit">Tạo</button>
        </form>
      </div>

      <div className="category-update-model"></div>

      <button className="category-create-btn" onClick={handleShowModelCreate}>
        THÊM
      </button>
      <h1>Lịch trình buổi trong ngày</h1>
      <table id="customers">
        <tr>
          <th>Buổi trong ngày</th>
          <th>ID lịch trình du lịch</th>
          <th style={{width:"20%"}}>Thao tác</th>
        </tr>
        {scheduleDate && scheduleDate.map(item=>{
          return (
        <tr>
          <td>{item.sessionDateName}</td>
          <td>{item.travelScheduleId}</td>
          <td>
            <button className="btn-update">Sửa</button>
                <button className="btn-delete" onClick={()=>handleDelete(item.id)}>Xóa</button>
          </td>
        </tr>
          )
        })}
        
      </table>
    </div>
  );
};

export default ScheduleDate;
