import React, { useEffect, useState } from "react";
import { publicRequest, userRequest } from "../../requestMethod";
import storage from '../../firebase/index'; 
import {ref as refStorage,uploadBytes, deleteObject , getDownloadURL} from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import {AiOutlineDelete} from 'react-icons/ai'
import {MdSystemUpdateAlt} from 'react-icons/md'
import {BsPencilSquare} from 'react-icons/bs'
const TravelImg = () => {
  const [enableModelCreate, setEnableModelCreate] = useState(false);
  const [travelId,setTravelId] = useState(null); 
  const [travelImages,setTravelImages] = useState([]);  
  const [url,setUrl] = useState([]);  
  const handleShowModelCreate = () => {
    setEnableModelCreate(true);
  };

  const handleCloseForm = () => {
    setEnableModelCreate(false);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await userRequest.post("/travelDetails/image", {
        image:url, 
        travelId
      },{
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user"))?.accessToken || null
          }`,
        },
      });
      setTravelImages(travel=>[...travel,response.data?.data]); 
      setEnableModelCreate(false); 
    } catch (error) {
      console.log(error);
    }
  };

  const getTravelImages = async()=>{
    try {
      const response = await userRequest.get(`/travelDetails/image`,{
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user"))?.accessToken || null
          }`,
        },
      }); 
      setTravelImages(response.data?.data); 
    } catch (error) {
      
    }
  }

  const handleDelete = async(id)=>{
    try {
      await userRequest.delete(`/travelDetails/image/${id}`,{
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user"))?.accessToken || null
          }`,
        },
      });
      getTravelImages(); 
    } catch (error) {
      
    }
  }

  const onFileChange = (files)=>{
    const file = files[0];
    const fileName =`images/${uuidv4()}-${file?.name}`; 
    const storageRef = refStorage(storage,fileName); 
    uploadBytes(storageRef,file).then((snapshot)=>{
        getDownloadURL(refStorage(storage,fileName)).then(downloadUrl => {
            setUrl(downloadUrl); 
        })
    })
  }


  useEffect(()=>{
    getTravelImages(); 
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
            type="file"
            onChange={(e) => onFileChange(e.target.files)}
            placeholder="files..."
          />
           <input
            type="number"
            value={travelId}
            onChange={(e) => setTravelId(e.target.value)}
            placeholder="Travel id ..."
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
          <th>Ảnh</th>
          <th>ID Travel</th>
          <th style={{width:"20%"}}>Thao tác</th>
        </tr>
        {
          travelImages && travelImages.map(item=>{
            return (
              <tr>
                <td>
                    <img width={180} height={180} src={item.image} alt="" />
                </td>
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

export default TravelImg;
