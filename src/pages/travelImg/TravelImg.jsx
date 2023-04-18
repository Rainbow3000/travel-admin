import React, { useEffect, useState } from "react";
import { publicRequest, userRequest } from "../../requestMethod";
import axios from "axios";
const TravelImg = () => {
  const [enableModelCreate, setEnableModelCreate] = useState(false);
  const [travelId,setTravelId] = useState(null); 
  const [travelImages,setTravelImages] = useState([]); 
  const [files,setFiles] = useState(null); 
  const handleShowModelCreate = () => {
    setEnableModelCreate(true);
  };

  const handleCloseForm = () => {
    setEnableModelCreate(false);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (const file of files) {
      formData.append("file", file);
    }
    try {
      formData.append("upload_preset", "my_travel");
      const url = process.env.REACT_APP_CLOUDINARY_URL;
      const { data } = await axios.post(url, formData);
      const response = await userRequest.post("/travelDetails/image", {
        image:data.url, 
        travelId
      });
      setTravelImages(travel=>[...travel,response.data?.data]); 
      setEnableModelCreate(false); 
    } catch (error) {
      console.log(error);
    }
  };

  const getTravelImages = async()=>{
    try {
      const response = await userRequest.get(`/travelDetails/image`); 
      setTravelImages(response.data?.data); 
    } catch (error) {
      
    }
  }

  const handleDelete = async(id)=>{
    try {
      await userRequest.delete(`/travelDetails/image/${id}`);
      getTravelImages(); 
    } catch (error) {
      
    }
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
        <h1>CREATE</h1>
        <form action="#" onSubmit={handleSubmitForm}>
          <input
            type="file"
            onChange={(e) => setFiles(e.target.files)}
            placeholder="files..."
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
      <h1>TRAVEL DETAILS IMAGE</h1>
      <table id="customers">
        <tr>
          <th>Image</th>
          <th>Travel Id</th>
          <th style={{width:"20%"}}>Options</th>
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

export default TravelImg;
