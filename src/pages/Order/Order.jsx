import React, { useEffect, useState } from "react";
import "./order.scss";
import { Link } from "react-router-dom";
import { publicRequest } from "../../requestMethod";
import axios from "axios";
const Order = () => {
  const [enableModelCreate, setEnableModelCreate] = useState(false);

  const [userId, setUserId] = useState(null);
  const [travelId, setTravelId] = useState(null);
  const [commentDate, setCommentDate] = useState(null);
  const [userCommentName, setUserCommentName] = useState("");
  const [content, setContent] = useState("");

  const [order, setOrder] = useState([]);

  const handleShowModelCreate = () => {
    setEnableModelCreate(true);
  };

  const handleCloseForm = () => {
    setEnableModelCreate(false);
  };

  const getOrder = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/travel/order",
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user"))?.accessToken || null
            }`,
          },
        }
      );
      setOrder(response.data?.data);
    } catch (error) {}
  };

  const handleConfirm = async (id) => {
    try {
      await axios.get(
        `http://localhost:8080/api/v1/travel/order/update/${id}`,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user"))?.accessToken || null
            }`,
          },
        }
      );
      getOrder();
    } catch (error) {}
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/travel/order/${id}`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user"))?.accessToken || null
          }`,
        },
      });
      getOrder();
    } catch (error) {}
  };

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <div className="category-container">
      <div
        className="category-overlay"
        onClick={handleCloseForm}
        style={{ display: enableModelCreate === true && "block" }}
      ></div>

      <h1>Đơn hàng</h1>
      <table id="customers">
        <tr>
          <th>ID người dùng</th>
          <th>Tên người dùng</th>
          <th>Email người dùng</th>
          <th>Địa chỉ người dùng</th>
          <th>Số điện thoại khách hàng</th>
          <th>Ngày đặt hàng</th>
          <th>Trạng thái</th>
          <th>Thao tác</th>
        </tr>

        {order &&
          order.map((item) => {
            return (
              <tr>
                <td>{item.userId}</td>
                <td>{item.customerName}</td>
                <td>{item.customerEmail}</td>
                <td>{item.customerAddress}</td>
                <td>{item.customerPhone}</td>
                <td>{item.createdDate.slice(0, 10)}</td>
                <td>{item.status}</td>
                <td
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <button className="btn-of-order">
                    <Link
                      className="link"
                      to={`/travel/order/details/${item.id}`}
                    >
                      Chi tiết
                    </Link>
                  </button>

                  <button
                    className="btn-of-order"
                    onClick={() => handleConfirm(item.id)}
                  >
                    Xác nhận
                  </button>
                  <button
                    className="btn-of-order"
                    onClick={() => handleDelete(item.id)}
                  >
                    Hủy
                  </button>
                </td>
              </tr>
            );
          })}
      </table>
    </div>
  );
};

export default Order;
