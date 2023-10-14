import React, { useEffect, useState } from "react";
import "./travelFeatured.scss";
import { publicRequest, userRequest } from "../../requestMethod";
import axios from "axios";
import {AiOutlineDelete} from 'react-icons/ai'
import {MdSystemUpdateAlt} from 'react-icons/md'
import {BsPencilSquare} from 'react-icons/bs'
const TravelFeatured = () => {
  const [enableModelCreate, setEnableModelCreate] = useState(false);

  const [featuredName, setFeaturedName] = useState("");
  const [travelId, setTravelId] = useState(null);
  const [featured,setFeatured] = useState([]); 
  const handleShowModelCreate = () => {
    setEnableModelCreate(true);
  };

  const handleCloseForm = () => {
    setEnableModelCreate(false);
  };



  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
     const response =  await userRequest.post("/travel/featured", {
        featuredName,
        travelId
      },{
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user"))?.accessToken || null
          }`,
        },
      });
      setFeatured(featured=>[...featured,response.data?.data])
      setEnableModelCreate(false); 
    } catch (error) {
      console.log(error);
    }
  };

  const getFeatured = async()=>{
    try {
      const response = await userRequest.get('/travel/featured',{
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user"))?.accessToken || null
          }`,
        },
      })
      setFeatured(response.data?.data)
    } catch (error) {
      
    }
  }


  const handleDelete = async(id)=>{
    try {
      await userRequest.delete(`/travel/featured/${id}`,{
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user"))?.accessToken || null
          }`,
        },
      })
      getFeatured(); 
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    getFeatured(); 
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
            value={featuredName}
            onChange={(e) => setFeaturedName(e.target.value)}
            placeholder="Featured name ..."
          />
          <input
            type="number"
            value={travelId}
            onChange={(e) => setTravelId(e.target.value)}
            placeholder="Travel id..."
          />
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
          <th>Tên nổi bật</th>
          <th>ID travel</th>
          <th style={{width:"20%"}}>Thao tác</th>
        </tr>

        {
          featured && featured.map(item=>{
            return (
              <tr>
                <td>{item.featuredName}</td>
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

export default TravelFeatured;
