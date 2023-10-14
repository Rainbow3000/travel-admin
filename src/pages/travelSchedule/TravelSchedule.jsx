import React, { useEffect, useState } from "react";
import "./travelSchedule.scss";
import { publicRequest } from "../../requestMethod";
import axios from "axios";
import {BsPencilSquare} from'react-icons/bs'
import {AiOutlineDelete} from 'react-icons/ai'
import {MdSystemUpdateAlt} from 'react-icons/md'
const TravelSchedule = () => {
  const [enableModelCreate, setEnableModelCreate] = useState(false);

  const [dateName, setDateName] = useState("");
  const [travelId,setTravelId] = useState(null); 
  const [travels,setTravels] = useState([]); 
  const [schedule,setSchedule] = useState([]); 

  const handleShowModelCreate = () => {
    setEnableModelCreate(true);
  };

  const getTravels = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/travel", {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user"))?.accessToken || null
          }`,
        },
      });
      setTravels(response.data?.data);
    } catch (error) {}
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
      },{
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user"))?.accessToken || null
          }`,
        },
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
      const response = await axios.get("http://localhost:8080/api/v1/travel/schedule",{
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user"))?.accessToken || null
          }`,
        },
      }); 
      setSchedule(response.data?.data); 
    } catch (error) {
      
    }
  }

  const handleDelete = async(id)=>{
    try {
      await axios.delete(`http://localhost:8080/api/v1/travel/schedule/${id}`,{
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user"))?.accessToken || null
          }`,
        },
      });
      getSchedule(); 
    } catch (error) {
      
    }
  }


  const handleTravelChange = (travelId)=>{
    setTravelId(travelId); 
  }


  useEffect(()=>{
    getSchedule(); 
    getTravels();
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
            value={dateName}
            onChange={(e) => setDateName(e.target.value)}
            placeholder="Tên ngày..."
          />
          
           <select onChange={(e)=>handleTravelChange(e.target.value)} style={{paddingLeft:5,marginTop:20,height:40,outline:'none',border:'1px solid rgba(128, 128, 128, 0.334)',borderRadius:5}}>
        
        <option disabled selected value="">Travel ID</option>
        {
          travels?.map(item=> {
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
          <th>Tên ngày</th>
          <th>ID Travel</th>
          <th style={{width:"20%"}}>Thao tác</th>
        </tr>
        {
          schedule && schedule.map(item=>{
            return (
              <tr>
                <td>{item.dateName}</td>
                <td>{item.travelId}</td>
                <td>
                  
                <MdSystemUpdateAlt size={20}/>
                 <AiOutlineDelete size={20} style={{marginLeft:10}} onClick={() => handleDelete(item.id)}/>
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
