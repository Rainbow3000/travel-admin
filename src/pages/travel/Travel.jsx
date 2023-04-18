import React, { useEffect, useState } from "react";
import axios from "axios";
import "./travel.scss";

const Travel = () => {
  const [enableModelCreate, setEnableModelCreate] = useState(false);

  const [travelName, setTravelName] = useState("");
  const [travelPriceNew, setTravelPriceNew] = useState(0);
  const [travelPriceOld, setTravelPriceOld] = useState(0);
  const [travelStatus, setTravelStatus] = useState(0);
  const [travelDescription, setTravelDescription] = useState("");
  const [travelAddress, setTravelAddress] = useState("");
  const [travelDateNumber, setTravelDateNumber] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [files, setFiles] = useState(null);
  const [travels, setTravels] = useState([]);

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
      const response = await axios.post(
        "https://proud-time-production.up.railway.app/api/v1/travel",
        {
          travelName,
          travelAddress,
          travelDescription,
          travelPriceNew,
          travelPriceOld,
          travelStatus,
          travelDateNumber,
          categoryId,
          travelImg: data.url,
        },
        {
          headers: {
            Authorization:
              "Bearer " +
              "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxLG5ndXllbmR1Y3RoaW5oMDQwMUBnbWFpbC5jb20iLCJpc3MiOiJ0aGluaG5kIiwicm9sZXMiOiJbUk9MRV9BRE1JTl0iLCJpYXQiOjE2ODE4MDA2MzYsImV4cCI6MTY4MTg4NzAzNn0.TerzPVfYQxYRYqXwiMJ5SPQyMTT9CnpirQaFoJbyKSk",
          },
        }
      );

      setTravels((travel) => [...travel, response.data?.data]);
      setTravelName("");
      setTravelAddress("");
      setTravelPriceNew("");
      setTravelPriceOld("");
      setFiles(null);
      setTravelDescription("");
      setTravelStatus("");
      setTravelDateNumber("");
      setEnableModelCreate(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getTravels = async () => {
    try {
      const response = await axios.get(
        "https://proud-time-production.up.railway.app/api/v1/travel"
      );
      setTravels(response.data?.data);
      setTravels(response.data?.data);
    } catch (error) {}
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://proud-time-production.up.railway.app/api/v1/travel/${id}`
      );
      getTravels();
    } catch (error) {}
  };

  useEffect(() => {
    getTravels();
  }, []);

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
            value={travelName}
            onChange={(e) => setTravelName(e.target.value)}
            placeholder="Travel name ..."
          />
          <input
            type="file"
            onChange={(e) => setFiles(e.target.files)}
            placeholder="Travel image..."
          />
          <input
            type="text"
            value={travelDescription}
            placeholder="Travel description..."
            onChange={(e) => setTravelDescription(e.target.value)}
          />
          <input
            type="number"
            value={travelPriceNew}
            onChange={(e) => setTravelPriceNew(e.target.value)}
            placeholder="Travel price new... "
          />
          <input
            type="number"
            value={travelPriceOld}
            onChange={(e) => setTravelPriceOld(e.target.value)}
            name=""
            id=""
            placeholder="Travel price old..."
          />
          <input
            type="text"
            value={travelAddress}
            onChange={(e) => setTravelAddress(e.target.value)}
            placeholder="Travel address..."
          />
          <input
            type="text"
            value={travelDateNumber}
            onChange={(e) => setTravelDateNumber(e.target.value)}
            placeholder="Travel date number ..."
          />
          <input
            type="number"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            placeholder="Category id..."
          />
          <input
            type="number"
            value={travelStatus}
            onChange={(e) => setTravelStatus(e.target.value)}
            placeholder="Travel status(0 or 1)..."
          />

          <button type="submit">Create</button>
        </form>
      </div>

      <div className="category-update-model"></div>

      <button className="category-create-btn" onClick={handleShowModelCreate}>
        CREATE
      </button>
      <h1>TRAVEL</h1>
      <table id="customers">
        <tr>
          <th>Travel name</th>
          <th>Travel description</th>
          <th>Travel image</th>
          <th>Travel price new</th>
          <th>Travel price old</th>
          <th>Travel address</th>
          <th>Travel date number</th>
          <th>Travel status</th>
          <th>Options</th>
        </tr>

        {travels &&
          travels.map((item) => {
            return (
              <tr>
                <td>{item.travelName}</td>
                <td>{item.travelDescription}</td>
                <td>
                  <img src={item.travelImg} width={120} height={120} alt="" />
                </td>
                <td>{item.travelPriceNew}</td>
                <td>{item.travelPriceOld}</td>
                <td>{item.travelAddress}</td>
                <td>{item.travelDateNumber}</td>
                <td>{item.travelStatus}</td>
                <td>
                  <button className="btn-update">Update</button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
      </table>
    </div>
  );
};

export default Travel;
