import React, { useEffect, useState } from "react";
import { publicRequest } from "../../requestMethod";
import "./orderdetails.scss";
import axios from "axios";
import { useLocation } from "react-router-dom";
const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [orderList, setOrderList] = useState([]);
  const location = useLocation();
  const orderId = location.pathname.split("/")[4];

  const getOrder = async () => {
    try {
      const orderResponse = await axios.get(
        `http://localhost:8080/api/v1/travel/order/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user"))?.accessToken || null
            }`,
          },
        }
      );

      const orderDetailsResponse = await axios.get(
        `http://localhost:8080/api/v1/travel/order/details/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user"))?.accessToken || null
            }`,
          },
        }
      );

      const orderListResponse = await axios.get(
        `http://localhost:8080/api/v1/travel/order/userId/${orderResponse?.data?.data?.userId}`,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user"))?.accessToken || null
            }`,
          },
        }
      );

      setOrder(orderResponse?.data?.data);
      setOrderList(orderListResponse?.data?.data);
      setOrderDetails(orderDetailsResponse?.data?.data);
    } catch (error) {}
  };

  const handleExportExcel = async () => {
    try {
      await axios.post("http://localhost:5000/api/v1/exportToExcel", orderList);
      alert("Xuất excel thành công !");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  console.log(order);
  console.log(orderList);

  return (
    <div className="order-details-container">
      <button className="export-excel-btn" onClick={handleExportExcel}>
        Xuất Excel
      </button>
      <div className="user-info">
        <h2>Thông tin khách hàng</h2>
        <span>
          Tên khách hàng: <b>{order && order.customerName}</b>
        </span>
        <span>
          Số điện thoại:<b>{order && order.customerPhone}</b>
        </span>
        <span>
          Địa chỉ:<b>{order && order.customerAddress}</b>
        </span>
        <span>
          Email:<b>{order && order.customerEmail}</b>
        </span>
      </div>

      <div className="user-order-current">
        <h2>Đơn hàng hiện tại</h2>
        <table id="order-table-current">
          <tr>
            <th>Travel Id</th>
            <th>Số lượng người</th>
            <th>Tổng tiền</th>
            <th>Ghi chú khách hàng</th>
            <th>Trạng thái</th>
          </tr>

          <tr>
            <td>{orderDetails && orderDetails.travelId}</td>
            <td>{orderDetails && orderDetails.peopelQuantity}</td>
            <td>{orderDetails && orderDetails.totalPrice}</td>
            <td>{orderDetails && orderDetails.customerNote}</td>
            <td>{orderDetails && orderDetails.status}</td>
          </tr>
        </table>
      </div>

      <div className="user-order-current">
        <h2>Danh sách đơn hàng đã đặt</h2>
        <table id="order-table-current">
          <tr>
            <th>Travel Id</th>
            <th>Số lượng người</th>
            <th>Tổng tiền</th>
            <th>Ghi chú khách hàng</th>
            <th>Trạng thái</th>
          </tr>

          {orderList &&
            orderList.map((item) => {
              return (
                <tr>
                  <td>{item && item.travelId}</td>
                  <td>{item && item.peopelQuantity}</td>
                  <td>{item && item.totalPrice}</td>
                  <td>{item && item.customerNote}</td>
                  <td>{item && item.status}</td>
                </tr>
              );
            })}
        </table>
      </div>
    </div>
  );
};

export default OrderDetails;
