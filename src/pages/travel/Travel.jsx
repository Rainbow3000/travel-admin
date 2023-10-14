import React, { useEffect, useState } from "react";
import axios from "axios";
import "./travel.scss";
import storage from '../../firebase/index'; 
import {ref as refStorage,uploadBytes, deleteObject , getDownloadURL} from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid';
import {AiOutlineDelete} from 'react-icons/ai'
import {MdSystemUpdateAlt} from 'react-icons/md'
import {BsPencilSquare} from 'react-icons/bs'
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
  const [travels, setTravels] = useState([]);
  const [categorys,setCategorys] = useState([]);
  const [url,setUrl] = useState(""); 

  const [travel,setTravel] = useState({}); 


  const getCategory = async () => {
    const response = await axios.get("http://localhost:8080/api/v1/category", {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user"))?.accessToken || null
        }`,
      },
    });
    setCategorys(response.data?.data);
  };


  const handleShowModelCreate = () => {
    setEnableModelCreate(true);
  };

  const handleCloseForm = () => {
    setEnableModelCreate(false);
    setEnableModelUpdate(false);
  };

  const handleShowModelUpdate = (travelId) => {
    const travel = travels.find(item => item.id === travelId); 
    setTravelName (travel.travelName)
    setTravelDescription(travel.travelDescription);
    setTravelPriceNew(travel.travelPriceNew);
    setTravelPriceOld(travel.travelPriceOld);
    setTravelAddress(travel.travelAddress); 
    setCategoryId(travel.categoryId);
    setEnableModelUpdate(true);
    setTravelStatus(travel.travelStatus);
    setTravelDateNumber(travel.travelDateNumber);
  
    setIdUpdate(travelId);
  };

  const handleCategoryChange = (categoryId)=>{
    setCategoryId(categoryId); 
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

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
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
          travelImg: url,
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
      setUrl(""); 
      setTravelDescription("");
      setTravelStatus("");
      setTravelDateNumber("");
      setEnableModelCreate(false);
      alert('Tạo tin thành công !');
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitFormUpdate = async (e) => {
    e.preventDefault();
    try {
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
          travelImg: url,
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
      setUrl("");
      setTravelDescription("");
      setTravelStatus("");
      setTravelDateNumber("");
      setEnableModelUpdate(false);
      getTravels(); 
      alert('Cập nhật tin thành công !');
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


      if(window.confirm('Bạn có chắc muốn xóa bản tin này không ?') === true){  
        await axios.delete(`http://localhost:8080/api/v1/travel/${id}`, {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user"))?.accessToken || null
            }`,
          },
        });
        getTravels();
      }


    } catch (error) {}
  };

  useEffect(() => {
    getTravels();
    getCategory(); 
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
            placeholder="Tên ..."
          />
          <input
            type="file"
            onChange={(e) =>  onFileChange(e.target.files)}
            placeholder="Ảnh..."
          />
          <input
            type="text"
            value={travelDescription}
            placeholder="Mô tả..."
            onChange={(e) => setTravelDescription(e.target.value)}
          />
          <input
            type="number"
            value={travelPriceNew}
            onChange={(e) => setTravelPriceNew(e.target.value)}
            placeholder="Giá... "
          />
          <input
            type="number"
            value={travelPriceOld}
            onChange={(e) => setTravelPriceOld(e.target.value)}
            name=""
            id=""
            placeholder="Giá cũ..."
          />
          <input
            type="text"
            value={travelAddress}
            onChange={(e) => setTravelAddress(e.target.value)}
            placeholder="Địa chỉ..."
          />
          <input
            type="text"
            value={travelDateNumber}
            onChange={(e) => setTravelDateNumber(e.target.value)}
            placeholder="Số ngày ..."
          />
          <select onChange={(e)=>handleCategoryChange(e.target.value)} style={{paddingLeft:5,marginTop:20,height:40,outline:'none',border:'1px solid rgba(128, 128, 128, 0.334)',borderRadius:5}}>
        
            <option disabled selected value="">Chọn danh mục</option>
            {
              categorys?.map(item=> {
                 return (
                  <option value={ parseInt(item.id)}>{item.id}</option>
                 )
              })
            }
          </select>
          <input
            type="number"
            value={travelStatus}
            onChange={(e) => setTravelStatus(e.target.value)}
            placeholder="Trạng thái (0 hoặc 1)"
          />

          <button style={{backgroundColor:'#009643',display:'flex',alignItems:'center',justifyContent:'center'}} type="submit"><BsPencilSquare/>Tạo</button>
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
            onChange={(e) => onFileChange(e.target.files)}
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
            <select value={categoryId} onChange={(e)=>handleCategoryChange(e.target.value)} style={{ paddingLeft:5, marginTop:20,height:40,outline:'none',border:'1px solid rgba(128, 128, 128, 0.334)',borderRadius:5}}>
        
        <option disabled selected value="">Chọn danh mục</option>
          {
            categorys?.map(item=> {
              return (
                <option value={ parseInt(item.id)}>{item.id}</option>
              )
            })
          }
      </select>
          <input
            type="number"
            value={travelStatus}
            onChange={(e) => setTravelStatus(e.target.value)}
            placeholder="Travel status(0 or 1)..."
          />

          <button style={{backgroundColor:'#009643',display:'flex',alignItems:'center',justifyContent:'center'}} type="submit">Cập nhật</button>
        </form>
      </div>

      <div className="category-update-model"></div>

      <button  className="category-create-btn" onClick={handleShowModelCreate}>
        <BsPencilSquare style={{marginRight:10}}/>
         THÊM MỚI
      </button>
      <h1 style={{height:40}}></h1>
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
                <td style={{width:'10%'}}>

                 <MdSystemUpdateAlt className="icon" size={20} onClick={() => handleShowModelUpdate(item.id)}/>
                 <AiOutlineDelete className="icon" size={20} style={{marginLeft:10}} onClick={() => handleDelete(item.id)}/>
                </td>
              </tr>
            );
          })}
      </table>
    </div>
  );
};

export default Travel;
