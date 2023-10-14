import React, { useEffect, useState } from "react";
import "./category.scss";
import axios from "axios";
import storage from '../../firebase/index'; 
import {ref as refStorage,uploadBytes, deleteObject , getDownloadURL} from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid';
import {AiOutlineDelete} from 'react-icons/ai'
import {MdSystemUpdateAlt} from 'react-icons/md'
import {BsPencilSquare} from 'react-icons/bs'
const Category = () => {
  const [enableModelCreate, setEnableModelCreate] = useState(false);
  const [enableModelUpdate, setEnableModelUpdate] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryStatus, setCategoryStatus] = useState(null);
  const [idUpdate, setIdUpdate] = useState(null);
  const [categorys, setCategorys] = useState([]);
  const [url,setUrl] = useState(""); 
  const handleShowModelCreate = () => {
    setEnableModelCreate(true);
  };

  const handleShowModelUpdate = (categoryId) => {
    setEnableModelUpdate(true);
    setIdUpdate(categoryId);
  };

  const handleCloseForm = () => {
    setEnableModelCreate(false);
    setEnableModelUpdate(false);
  };


  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try { 
      const response = await axios.post(
        "http://localhost:8080/api/v1/category",
        {
          categoryName,
          categoryImg:url,
          categoryStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user"))?.accessToken || null
            }`,
          },
        }
      );
      setEnableModelCreate(false);
      setUrl("");
      setCategorys((category) => [...category, response.data?.data]);
      setCategoryName("");
      setCategoryStatus("");
      setEnableModelUpdate(false);
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitFormUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8080/api/v1/category/${idUpdate}`,
        {
          categoryName,
          categoryImg: url,
          categoryStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user"))?.accessToken || null
            }`,
          },
        }
      );
      handleCloseForm(); 
      setCategoryName("");
      setCategoryStatus("");
      setEnableModelUpdate(false);
      getCategory();
  
    } catch (error) {
      console.log(error);
    }
  };

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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/category/${id}`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user"))?.accessToken || null
          }`,
        },
      });
      getCategory();
    } catch (error) {}
  };

  const onFileChange = (files)=>{
    const file = files[0];
    console.log(file);
    const fileName =`images/${uuidv4()}-${file?.name}`; 
    const storageRef = refStorage(storage,fileName); 
    uploadBytes(storageRef,file).then((snapshot)=>{
        getDownloadURL(refStorage(storage,fileName)).then(downloadUrl => {
            console.log(downloadUrl);
            setUrl(downloadUrl); 
        })
    })
  }

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="category-container">
      <div
        className="category-overlay"
        onClick={handleCloseForm}
        style={{ display: enableModelCreate === true | enableModelUpdate === true ? "block" :"none" }}
      ></div>
      <div
        style={{ display: enableModelCreate === true && "flex" }}
        className="category-create-model"
      >
         <h1 style={{height:40}}></h1>
        <form action="#" onSubmit={handleSubmitForm}>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Category name ..."
          />
          <input
            type="file"
            onChange={(e) => onFileChange(e.target.files)}
            placeholder="Category image"
          />
          <input
            type="number"
            value={categoryStatus}
            onChange={(e) => setCategoryStatus(e.target.value)}
            placeholder="Category status(0 or 1)"
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
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Category name ..."
          />
          <input
            type="file"
            onChange={(e) => onFileChange(e.target.files)}
            placeholder="Category image"
          />
          <input
            type="number"
            value={categoryStatus}
            onChange={(e) => setCategoryStatus(e.target.value)}
            placeholder="Category status(0 or 1)"
          />
          <button type="submit">Cập nhật</button>
        </form>
      </div>

      <button className="category-create-btn" onClick={handleShowModelCreate}>
      <BsPencilSquare style={{marginRight:10}}/>
         THÊM MỚI
      </button>
      <h1 style={{height:40}}></h1>
      <table id="customers">
        <tr>
          <th>Tên danh mục</th>
          <th>Ảnh danh mục</th>
          <th>Trạng thái</th>
          <th style={{ width: "20%" }}>Thao tác</th>
        </tr>
        {categorys &&
          categorys.map((item) => {
            return (
              <tr>
                <td>{item.categoryName}</td>
                <td>
                  <img width={120} height={120} src={item.categoryImg} alt="" />
                </td>
                <td>{item.categoryStatus}</td>
                <td>
                 <MdSystemUpdateAlt size={20} onClick={() => handleShowModelUpdate(item.id)}/>
                 <AiOutlineDelete size={20} style={{marginLeft:10}} onClick={() => handleDelete(item.id)}/>
                 
                </td>
              </tr>
            );
          })}
      </table>
    </div>
  );
};

export default Category;
