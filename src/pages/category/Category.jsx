import React, { useEffect, useState } from "react";
import "./category.scss";
import { publicRequest } from "../../requestMethod";
import axios from "axios";
const Category = () => {
  const [enableModelCreate, setEnableModelCreate] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryStatus, setCategoryStatus] = useState(null);
  const [files, setFiles] = useState(null);

  const [categorys,setCategorys] = useState([]); 
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
      const response = await axios.post("http://localhost:8080/api/v1/category", {
        categoryName,
        categoryImg: data.url,
        categoryStatus,
      });
      setCategorys(category=>[...category,response.data?.data])
      setCategoryName("");
      setCategoryStatus("");
      setFiles(null); 
      setEnableModelCreate(false); 
    } catch (error) {
      console.log(error);
    }
  };

  const getCategory = async()=>{
    const response = await axios.get('http://localhost:8080/api/v1/category');
    setCategorys(response.data?.data) 
  }

  const handleDelete = async(id)=>{
    try {
      await axios.delete(`http://localhost:8080/api/v1/category/${id}`)
      getCategory(); 
    
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    getCategory(); 
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
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Category name ..."
          />
          <input
            type="file"
            onChange={(e) => setFiles(e.target.files)}
            placeholder="Category image"
          />
          <input
            type="number"
            value={categoryStatus}
            onChange={(e) => setCategoryStatus(e.target.value)}
            placeholder="Category status(0 or 1)"
          />
          <button type="submit">Create</button>
        </form>
      </div>

      <div className="category-update-model"></div>

      <button className="category-create-btn" onClick={handleShowModelCreate}>
        CREATE
      </button>
      <h1>CATEGORY</h1>
      <table id="customers">
        <tr>
          <th>Category Name</th>
          <th>Category Image</th>
          <th>Status</th>
          <th style={{width:"20%"}}>Options</th>
        </tr>
        {
          categorys && categorys.map(item=>{
            return (
                <tr>
                  <td>{item.categoryName}</td>
                  <td>
                    <img width={120} height={120} src={item.categoryImg} alt="" />
                  </td>
                  <td>{item.categoryStatus}</td>
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

export default Category;
