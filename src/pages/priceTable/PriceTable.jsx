import React, { useEffect, useState } from "react";
import "./priceTable.scss";
import { publicRequest, userRequest } from "../../requestMethod";
import axios from "axios";
const PriceTable = () => {
  const [enableModelCreate, setEnableModelCreate] = useState(false);

  const [dateStart, setDateStart] = useState("");
  const [typeTransport,setTypeTransport] = useState(""); 
  const [price,setPrice] = useState(0); 
  const [place,setPlace] = useState(""); 
  const [travelId, setTravelId] = useState(null);
  const [priceTable,setPriceTable] = useState([]) ; 


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
      });

      setPriceTable(price=>[...price,response.data?.data]); 
      setEnableModelCreate(false); 
     
    } catch (error) {
      console.log(error);
    }
  };

  const getPriceTable = async()=>{
    try {
      const response = await userRequest.get("/travel/price")
      setPriceTable(response.data?.data); 
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    getPriceTable(); 
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
            value={dateStart}
            onChange={(e) => setDateStart(e.target.value)}
            placeholder="Date start ..."
          />
          <input
            type="text"
            value={typeTransport}
            onChange={(e) => setTypeTransport(e.target.value)}
            placeholder="Type transport ..."
          />
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price ..."
          />
          <input
            type="text"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            placeholder="Place start..."
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
      <h1>PRICE TABLE</h1>
      <table id="customers">
        <tr>
          <th>Start Date</th>
          <th>Transport Type</th>
          <th>Place</th>
          <th>Price</th>
          <th style={{width:"20%"}}>Options</th>
        </tr>

        {priceTable && priceTable.map(item=>{
          return(
            <tr>
              <td>{item.dateStart}</td>
              <td>{item.typeTransport}</td>
              <td>{item.place}</td>
              <td>{item.price}</td>
              <td>
                <button className="btn-update">Update</button>
                <button className="btn-delete">Delete</button>
              </td>
            </tr>
          )
        })}
        
      </table>
    </div>
  );
};

export default PriceTable;
