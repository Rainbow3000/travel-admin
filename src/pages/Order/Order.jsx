import React, { useEffect, useState } from "react";
import "./order.scss";
import { Link } from "react-router-dom";
import { publicRequest } from "../../requestMethod";

import {AiOutlineSearch} from 'react-icons/ai'
import {MdDone} from 'react-icons/md'
import {HiXMark} from 'react-icons/hi2'

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

      if(window.confirm('Xác nhận đơn đặt lịch ?') === true){   
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
      }

    } catch (error) {}
  };

  const handleDelete = async (id) => {
    try {

      if(window.confirm('Bạn có chắc muốn xóa người đơn đặt lịch này không ?') === true){  
          await axios.delete(`http://localhost:8080/api/v1/travel/order/${id}`, {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("user"))?.accessToken || null
              }`,
            },
          });
          getOrder();
      }

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

      <h1 style={{height:40}}></h1>
      <table id="customers">
        <tr>
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
                 
                    <Link
                      className="link"
                      to={`/travel/order/details/${item.id}`}
                    >
                      <AiOutlineSearch  size={20}/>
                    </Link>
                  

                
                    <MdDone style={{cursor:'pointer',color:'green'}} size={20} onClick={() => handleConfirm(item.id)}/>
                    <HiXMark style={{cursor:'pointer',color:'red'}} size={20} onClick={() => handleDelete(item.id)} />
                
                </td>
              </tr>
            );
          })}
      </table>
    </div>
  );
};

export default Order;
