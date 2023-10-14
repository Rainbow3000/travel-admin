import React, { useEffect, useState } from "react";
import "./priceTable.scss";
import { publicRequest, userRequest } from "../../requestMethod";
import axios from "axios";
import {AiOutlineDelete} from 'react-icons/ai'
import {MdSystemUpdateAlt} from 'react-icons/md'
import {BsPencilSquare} from 'react-icons/bs'
const PriceTable = () => {
const [enableModelCreate, setEnableModelCreate] = useState(false);

  const [dateStart, setDateStart] = useState("");
  const [typeTransport,setTypeTransport] = useState(""); 
  const [price,setPrice] = useState(""); 
  const [place,setPlace] = useState(""); 
  const [travelId, setTravelId] = useState(null);
  const [priceTable,setPriceTable] = useState([]) ; 
  const [travels,setTravels] = useState([]); 



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


  const handleTravelChange = (travelId)=>{
    setTravelId(travelId); 
  }



  const handleShowModelCreate = () => {
    setEnableModelCreate(true);
  };

  const handleCloseForm = () => {
    setEnableModelCreate(false);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
     const response =  await userRequest.post("/travel/price", {
        dateStart,
        typeTransport,
        place,
        price,
        travelId
      },{
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user"))?.accessToken || null
          }`,
        },
      });

      setPriceTable(price=>[...price,response.data?.data]); 
      setEnableModelCreate(false); 
     
    } catch (error) {
      console.log(error);
    }
  };

  const getPriceTable = async()=>{
    try {
      const response = await userRequest.get("/travel/price",{
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user"))?.accessToken || null
          }`,
        },
      })
      setPriceTable(response.data?.data); 
    } catch (error) {
      
    }
  }

  const handleDelete = async(id)=>{
    try {
      await axios.delete(`http://localhost:8080/api/v1/travel/price/${id}`,{
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user"))?.accessToken || null
          }`,
        },
      })
      getPriceTable(); 
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    getPriceTable(); 
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
        <h1>THÊM MỚI</h1>
        <form action="#" onSubmit={handleSubmitForm}>
          <input
            type="text"
            value={dateStart}
            onChange={(e) => setDateStart(e.target.value)}
            placeholder="Ngày bắt đầu ..."
          />
          <input
            type="text"
            value={typeTransport}
            onChange={(e) => setTypeTransport(e.target.value)}
            placeholder="Loại phương tiện ..."
          />
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
            placeholder="Giá ..."
          />
          <input
            type="text"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            placeholder="Điểm xuất phát..."
          />
           <select onChange={(e)=>handleTravelChange(e.target.value)} style={{paddingLeft:5,marginTop:20,height:40,outline:'none',border:'1px solid rgba(128, 128, 128, 0.334)',borderRadius:5}}>
        
        <option disabled selected value="">ID Bản Tin</option>
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
          <th>Ngày bắt đầu</th>
          <th>Loại phương tiện</th>
          <th>Địa điểm</th>
          <th>Giá vé</th>
          <th style={{width:"20%"}}>Thao tác</th>
        </tr>

        {priceTable && priceTable.map(item=>{
          return(
            <tr>
              <td>{item.dateStart.split('-').reverse().join(' / ')}</td>
              <td>{item.typeTransport}</td>
              <td>{item.place}</td>
              <td>{item.price}</td>
              <td>
                 <MdSystemUpdateAlt size={20}/>
                 <AiOutlineDelete onClick={()=>handleDelete(item.id)} size={20} style={{marginLeft:10}}/>
              </td>
            </tr>
          )
        })}
        
      </table>
    </div>
  );
};

export default PriceTable;
