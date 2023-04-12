import React, { useEffect, useState } from "react";
import "./scheduleContent.scss";
import { publicRequest } from "../../requestMethod";
import axios from "axios";
const ScheduleContent = () => {
  const [enableModelCreate, setEnableModelCreate] = useState(false);

  const [content, setContent] = useState("");
  const [scheduleDateId,setScheduleDateId] = useState(null); 

  const [scheduleContent,setScheduleContent] = useState([]); 

  const handleShowModelCreate = () => {
    setEnableModelCreate(true);
  };

  const handleCloseForm = () => {
    setEnableModelCreate(false);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/v1/travel/schedule/content", {
        content,
        scheduleDateId
      });
      setScheduleContent(contents=>[...contents,response.data?.data]); 
      setContent(""); 
      setEnableModelCreate(false); 
    } catch (error) {
      console.log(error);
    }
  };

  const getScheduleContent = async()=>{
    try {
      const response = await axios.get('http://localhost:8080/api/v1/travel/schedule/content');
      setScheduleContent(response.data?.data); 
    } catch (error) {
      
    }
  }
  const handleDelete = async(id)=>{
    try {
      await axios.delete(`http://localhost:8080/api/v1/travel/schedule/content/${id}`);
      getScheduleContent(); 
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    getScheduleContent(); 
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
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Date content..."
          />
           <input
            type="number"
            value={scheduleDateId}
            onChange={(e) => setScheduleDateId(e.target.value)}
            placeholder="Schedule date id ..."
          />
          <button type="submit">Create</button>
        </form>
      </div>

      <div className="category-update-model"></div>

      <button className="category-create-btn" onClick={handleShowModelCreate}>
        CREATE
      </button>
      <h1>SCHEDULE CONTENT</h1>
      <table id="customers">
        <tr>
          <th>Content</th>
          <th>Shedule Date Id</th>
          <th>Options</th>
        </tr>

        {
          scheduleContent && scheduleContent.map(item=>{
            return (
              <tr>
                <td>{item.content}</td>
                <td>{item.scheduleDateId}</td>
                <td style={{width:"20%"}}>
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

export default ScheduleContent;
