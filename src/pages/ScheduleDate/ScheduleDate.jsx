import React, { useEffect, useState } from "react";
import "./scheduleDate.scss";
import { publicRequest } from "../../requestMethod";
import axios from "axios";
import {AiOutlineDelete} from 'react-icons/ai'
import {MdSystemUpdateAlt} from 'react-icons/md'
import {BsPencilSquare} from'react-icons/bs'
const ScheduleDate = () => {
  const [enableModelCreate, setEnableModelCreate] = useState(false);

  const [sessionDateName, setSessionDateName] = useState("");
  const [travelScheduleId,setTravelScheduleId] = useState(null); 
  const [scheduleDate,setScheduleDate] = useState([]); 
  const [schedules,setSchedules] = useState([]);


  const handleShowModelCreate = () => {
    setEnableModelCreate(true);
  };

  const getSchedule = async()=>{
    try {
      const response = await axios.get("http://localhost:8080/api/v1/travel/schedule",{
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user"))?.accessToken || null
          }`,
        },
      }); 
      setSchedules(response.data?.data); 
    } catch (error) {
      
    }
  }


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

  const handleScheduleChange = (scheduleId)=>{
      setTravelScheduleId(scheduleId); 
  }

  useEffect(()=>{
    getScheduleDate();
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
        <h1>TẠO</h1>
        <form action="#" onSubmit={handleSubmitForm}>
          <input
            type="text"
            value={sessionDateName}
            onChange={(e) => setSessionDateName(e.target.value)}
            placeholder="Session date name..."
          />
               <select onChange={(e)=>handleScheduleChange(e.target.value)} style={{paddingLeft:5,marginTop:20,height:40,outline:'none',border:'1px solid rgba(128, 128, 128, 0.334)',borderRadius:5}}>
        
        <option disabled selected value="">ID Ngày</option>
        {
          schedules?.map(item=> {
             return (
              <option value={ parseInt(item.id)}>{item.id}</option>
             )
          })
        }
      </select>
         <button style={{backgroundColor:'#009643',display:'flex',alignItems:'center',justifyContent:'center'}} type="submit"><BsPencilSquare/>Tạo</button>
        </form>
      </div>

      <div className="category-update-model"></div>

      <button className="category-create-btn" onClick={handleShowModelCreate}>
      <BsPencilSquare style={{marginRight:10}}/>
         THÊM MỚI
      </button>
      <h1 style={{height:40}}></h1>
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
                 <MdSystemUpdateAlt size={20}/>
                 <AiOutlineDelete size={20} style={{marginLeft:10}} onClick={() => handleDelete(item.id)}/>
          </td>
        </tr>
          )
        })}
        
      </table>
    </div>
  );
};

export default ScheduleDate;
