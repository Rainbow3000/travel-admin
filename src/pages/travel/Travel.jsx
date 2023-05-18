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
  const [enableModelUpdate, setEnableModelUpdate] = useState(false);
  const [idUpdate, setIdUpdate] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [files, setFiles] = useState("");
  const [travels, setTravels] = useState([]);

  const handleShowModelCreate = () => {
    setEnableModelCreate(true);
  };

  const handleCloseForm = () => {
    setEnableModelCreate(false);
    setEnableModelUpdate(false);
  };

  const handleShowModelUpdate = (categoryId) => {
    setEnableModelUpdate(true);
    setIdUpdate(categoryId);
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
        "http://localhost:8080/api/v1/travel",
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
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user"))?.accessToken || null
            }`,
          },
        }
      );

      setTravels((travel) => [...travel, response.data?.data]);
      setTravelName("");
      setTravelAddress("");
      setTravelPriceNew("");
      setTravelPriceOld("");
      setFiles("");
      setTravelDescription("");
      setTravelStatus("");
      setTravelDateNumber("");
      setEnableModelCreate(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitFormUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (const file of files) {
      formData.append("file", file);
    }
    try {
      formData.append("upload_preset", "my_travel");
      const url = process.env.REACT_APP_CLOUDINARY_URL;
      const { data } = await axios.post(url, formData);
      const response = await axios.put(
        `http://localhost:8080/api/v1/travel/${idUpdate}`,
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
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user"))?.accessToken || null
            }`,
          },
        }
      );

      setTravels((travel) => [...travel, response.data?.data]);
      setTravelName("");
      setTravelAddress("");
      setTravelPriceNew("");
      setTravelPriceOld("");
      setFiles("");
      setTravelDescription("");
      setTravelStatus("");
      setTravelDateNumber("");
      setEnableModelUpdate(false);
      getTravels(); 
    } catch (error) {
      console.log(error);
    }
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
      setTravels(response.data?.data);
    } catch (error) {}
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/travel/${id}`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user"))?.accessToken || null
          }`,
        },
      });
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
        style={{display: enableModelCreate === true | enableModelUpdate === true ? "block" :"none" }}
      ></div>
      <div
        style={{ display: enableModelCreate === true && "flex" }}
        className="category-create-model"
      >
        <h1>THÊM MỚI</h1>
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

          <button type="submit">Tạo</button>
        </form>
      </div>

      <div
        style={{ display: enableModelUpdate === true && "flex" }}
        className="category-create-model"
      >
        <h1>CẬP NHẬT</h1>
        <form action="#" onSubmit={handleSubmitFormUpdate}>
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

          <button type="submit">Cập nhật</button>
        </form>
      </div>

      <div className="category-update-model"></div>

      <button className="category-create-btn" onClick={handleShowModelCreate}>
        THÊM
      </button>
      <h1>Travel</h1>
      <table id="customers">
        <tr>
          <th>Tên Travel</th>
          <th>Mô tả</th>
          <th>Ảnh</th>
          <th>Giá mới</th>
          <th>Giá cũ</th>
          <th>Địa chỉ</th>
          <th>Số ngày</th>
          <th>Trạng thái</th>
          <th>Thao tác</th>
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
                  <button
                    className="btn-update"
                    onClick={() => handleShowModelUpdate(item.id)}
                  >
                    Sửa
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(item.id)}
                  >
                    Xóa
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
