import React, { useEffect, useState } from "react";
import "./category.scss";
import axios from "axios";
const Category = () => {
  const [enableModelCreate, setEnableModelCreate] = useState(false);
  const [enableModelUpdate, setEnableModelUpdate] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryStatus, setCategoryStatus] = useState(null);
  const [files, setFiles] = useState("");
  const [idUpdate, setIdUpdate] = useState(null);
  const [categorys, setCategorys] = useState([]);

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
    const formData = new FormData();

    for (const file of files) {
      formData.append("file", file);
    }
    try {
      formData.append("upload_preset", "my_travel");
      const url = process.env.REACT_APP_CLOUDINARY_URL;
      const { data } = await axios.post(url, formData);
      const response = await axios.post(
        "http://localhost:8080/api/v1/category",
        {
          categoryName,
          categoryImg: data.url,
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
      setCategorys((category) => [...category, response.data?.data]);
      setCategoryName("");
      setCategoryStatus("");
      setFiles("");
      setEnableModelUpdate(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitFormUpdate = async (e) => {
    console.log("updating...");
    e.preventDefault();
    const formData = new FormData();

    for (const file of files) {
      formData.append("file", file);
    }
    try {
      formData.append("upload_preset", "my_travel");
      const url = process.env.REACT_APP_CLOUDINARY_URL;
      const { data } = await axios.post(url, formData);
      await axios.put(
        `http://localhost:8080/api/v1/category/${idUpdate}`,
        {
          categoryName,
          categoryImg: data.url,
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
      setFiles("");
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
        <h1>TẠO</h1>
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
          <button type="submit">Cập nhật</button>
        </form>
      </div>

      <button className="category-create-btn" onClick={handleShowModelCreate}>
        THÊM
      </button>
      <h1>Danh mục</h1>
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

export default Category;
