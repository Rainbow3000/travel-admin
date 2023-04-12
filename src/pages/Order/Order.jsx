import React, { useEffect, useState } from "react";
import "./order.scss";
import { publicRequest } from "../../requestMethod";
import axios from "axios";
const Order = () => {
  const [enableModelCreate, setEnableModelCreate] = useState(false);

  const [userId, setUserId] = useState(null);
  const [travelId,setTravelId] = useState(null); 
  const [commentDate,setCommentDate] = useState(null); 
  const [userCommentName,setUserCommentName] = useState(""); 
  const [content,setContent] = useState(""); 

  const [order,setOrder] = useState([]); 

  const handleShowModelCreate = () => {
    setEnableModelCreate(true);
  };

  const handleCloseForm = () => {
    setEnableModelCreate(false);
  };


  const getOrder = async()=>{
    try {
      const response = await axios.get('http://localhost:8080/api/v1/travel/order'); 
      setOrder(response.data?.data); 
    } catch (error) {
      
    }
  }

  const handleConfirm = async(id)=>{
    try {
      await axios.put(`http://localhost:8080/api/v1/travel/order/${id}`)
      getOrder(); 
    } catch (error) {
      
    }
  }

  const handleDelete = async(id)=>{
    try {
      await axios.delete(`http://localhost:8080/api/v1/travel/order/${id}`)
      getOrder(); 
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    getOrder(); 
  },[])

  return (
    <div className="category-container">
      <div
        className="category-overlay"
        onClick={handleCloseForm}
        style={{ display: enableModelCreate === true && "block" }}
      ></div>
    
      <button className="category-create-btn" onClick={handleShowModelCreate}>
        CREATE
      </button>
      <h1>ORDER</h1>
      <table id="customers">
        <tr>
          <th>User ID</th>
          <th>Travel ID</th>
          <th>Customer Name</th>
          <th>Customer Email</th>
          <th>Customer Address</th>
          <th>Customer Phone</th>
          <th>Total Price</th>
          <th>People Quantity</th>
          <th>Customer Note</th>
          <th>Status</th>
          <th>Options</th>
        </tr>

        {
          order && order.map(item=>{
            return (
              <tr>
                <td>{item.userId}</td>
                <td>{item.travelId}</td>
                <td>{item.customerName}</td>
                <td>{item.customerEmail}</td>
                <td>{item.customerAddress}</td>
                <td>{item.customerPhone}</td>
                <td>{item.totalPrice}</td>
                <td>{item.peopelQuantity}</td>
                <td>{item.customerNote}</td>
                <td>{item.status}</td>
                <td>
                  <button className="btn-update" onClick={()=>handleConfirm(item.id)}>Confirm</button>
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

export default Order;
