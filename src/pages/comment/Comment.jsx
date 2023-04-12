import React, { useEffect, useState } from "react";
import "./comment.scss";
import { publicRequest } from "../../requestMethod";
import axios from "axios";
const Comment = () => {
  const [enableModelCreate, setEnableModelCreate] = useState(false);

  const [userId, setUserId] = useState(null);
  const [travelId,setTravelId] = useState(null); 
  const [commentDate,setCommentDate] = useState(null); 
  const [userCommentName,setUserCommentName] = useState(""); 
  const [content,setContent] = useState(""); 
  const [comment,setComment] = useState([]); 

  const handleShowModelCreate = () => {
    setEnableModelCreate(true);
  };

  const handleCloseForm = () => {
    setEnableModelCreate(false);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/v1/travel/comment", {
       userId,
       travelId,
       content,
       commentDate,
       userCommentName
      });
      console.log("create success!");
    } catch (error) {
      console.log(error);
    }
  };

  const getComment = async()=>{
    try {
      const response = await axios.get('http://localhost:8080/api/v1/travel/comment'); 
      setComment(response.data?.data); 
    } catch (error) {
      
    }
  }

  const handleDelete = async(id)=>{
    try {
      await axios.delete(`http://localhost:8080/api/v1/travel/comment/${id}`)
      getComment(); 
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    getComment(); 
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
            type="number"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="User id..."
          />
            <input
             type="text"
             value={userCommentName}
             onChange={(e) => setUserCommentName(e.target.value)}
             placeholder="Comment user name ..."
           />
           <input
            type="number"
            value={travelId}
            onChange={(e) => setTravelId(e.target.value)}
            placeholder="Travel id ..."
          />
           <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content ..."
          />
           <input
            type="text"
            value={commentDate}
            onChange={(e) => setCommentDate(e.target.value)}
            placeholder="Comment date ..."
          />
          <button type="submit">Create</button>
        </form>
      </div>

      <div className="category-update-model"></div>

      <button className="category-create-btn" onClick={handleShowModelCreate}>
        CREATE
      </button>
      <h1>COMMENT</h1>
      <table id="customers">
        <tr>
          <th>User ID</th>
          <th>User Name</th>
          <th>Travel ID</th>
          <th>Content</th>
          <th>Comment Date</th>
          <th style={{width:"20%"}}>Options</th>
        </tr>

        {
          comment && comment.map(item=>{
            return (
              <tr>
                <td>{item.userId}</td>
                <td>{item.userCommentName}</td>
                <td>{item.travelId}</td>
                <td>{item.content}</td>
                <td>{item.commentDate}</td>
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

export default Comment;
