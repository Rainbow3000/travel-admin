import React, { useState, useEffect } from "react";
import "./dashboard.scss";
import axios from "axios";
import UserChart from "../../components/charts/UserCharts";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
const Dashboard = () => {
  const [orderList, setOrderList] = useState([]);
  const [orderListDetails, setOrderListDetails] = useState([]);
  const [userList, setUserList] = useState([]);

  const data = [
    {
      month: 1,
      order: 0,
      user: 0,
    },
    {
      month: 2,
      order: 0,
      user: 0,
    },
    {
      month: 3,
      order: 0,
      user: 0,
    },
    {
      month: 4,
      order: 0,
      user: 0,
    },
    {
      month: 5,
      order: 0,
      user: 0,
    },
    {
      month: 6,
      order: 0,
      user: 0,
    },
    {
      month: 7,
      order: 0,
      user: 0,
    },
    {
      month: 8,
      order: 0,
      user: 0,
    },
    {
      month: 9,
      order: 0,
      user: 0,
    },
    {
      month: 10,
      order: 0,
      user: 0,
    },
    {
      month: 11,
      order: 0,
      user: 0,
    },
    {
      month: 12,
      order: 0,
      user: 0,
    },
  ];

  const getOrderList = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/travel/order",
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user"))?.accessToken || null
            }`,
          },
        }
      );
      setOrderList(data?.data);
    } catch (error) {}
  };

  const getOrderListDetails = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/travel/order/details",
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user"))?.accessToken || null
            }`,
          },
        }
      );
      setOrderListDetails(data?.data);
    } catch (error) {}
  };

  const getUserList = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/user", {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user"))?.accessToken || null
          }`,
        },
      });
      setUserList(data?.data);
    } catch (error) {}
  };

  useEffect(() => {
    getOrderList();
    getOrderListDetails();
    getUserList();
  }, []);

  console.log(userList);

  let totalPriceCurrentMonth = 0;
  let totalPriceLastMonth = 0;

  let countUserRegsCurrentMonth = 0;
  let countUserRegsLastMonth = 0;

  const date = new Date();
  let orderCountCurrent = 0;
  let orderCountLast = 0;
  orderList &&
    orderList.forEach((item) => {
      const month = item.createdDate.split("-")[1].slice(1);
      if (parseInt(month) === parseInt(date.getMonth() + 1)) {
        orderCountCurrent++;
      }
      if (parseInt(month) === parseInt(date.getMonth())) {
        orderCountLast++;
      }
      if (parseInt(month) === 1) {
        const dataItem = data.find(
          (ditem) => parseInt(ditem.month) === parseInt(month)
        );
        if (dataItem) {
          dataItem.order = dataItem.order + 1;
        }
      }
      if (parseInt(month) === 2) {
        const dataItem = data.find(
          (ditem) => parseInt(ditem.month) === parseInt(month)
        );
        if (dataItem) {
          dataItem.order = dataItem.order + 1;
        }
      }
      if (parseInt(month) === 3) {
        const dataItem = data.find(
          (ditem) => parseInt(ditem.month) === parseInt(month)
        );
        if (dataItem) {
          dataItem.order = dataItem.order + 1;
        }
      }
      if (parseInt(month) === 4) {
        const dataItem = data.find(
          (ditem) => parseInt(ditem.month) === parseInt(month)
        );
        if (dataItem) {
          dataItem.order = dataItem.order + 1;
        }
      }
      if (parseInt(month) === 5) {
        const dataItem = data.find(
          (ditem) => parseInt(ditem.month) === parseInt(month)
        );
        if (dataItem) {
          dataItem.order = dataItem.order + 1;
        }
      }
      if (parseInt(month) === 6) {
        const dataItem = data.find(
          (ditem) => parseInt(ditem.month) === parseInt(month)
        );
        if (dataItem) {
          dataItem.order = dataItem.order + 1;
        }
      }
      if (parseInt(month) === 7) {
        const dataItem = data.find(
          (ditem) => parseInt(ditem.month) === parseInt(month)
        );
        if (dataItem) {
          dataItem.order = dataItem.order + 1;
        }
      }
      if (parseInt(month) === 8) {
        const dataItem = data.find(
          (ditem) => parseInt(ditem.month) === parseInt(month)
        );
        if (dataItem) {
          dataItem.order = dataItem.order + 1;
        }
      }
      if (parseInt(month) === 9) {
        const dataItem = data.find(
          (ditem) => parseInt(ditem.month) === parseInt(month)
        );
        if (dataItem) {
          dataItem.order = dataItem.order + 1;
        }
      }
      if (parseInt(month) === 10) {
        const dataItem = data.find(
          (ditem) => parseInt(ditem.month) === parseInt(month)
        );
        if (dataItem) {
          dataItem.order = dataItem.order + 1;
        }
      }
      if (parseInt(month) === 11) {
        const dataItem = data.find(
          (ditem) => parseInt(ditem.month) === parseInt(month)
        );
        if (dataItem) {
          dataItem.order = dataItem.order + 1;
        }
      }
      if (parseInt(month) === 12) {
        const dataItem = data.find(
          (ditem) => parseInt(ditem.month) === parseInt(month)
        );
        if (dataItem) {
          dataItem.order = dataItem.order + 1;
        }
      }
    });

  orderListDetails &&
    orderListDetails.forEach((item) => {
      const month = item.createdDate.split("-")[1].slice(1);
      if (parseInt(month) === parseInt(date.getMonth() + 1)) {
        totalPriceCurrentMonth += item.totalPrice;
      }
      if (parseInt(month) === parseInt(date.getMonth())) {
        totalPriceLastMonth += item.totalPrice;
      }
    });

  userList &&
    userList.forEach((item) => {
      const month = item.createdDate.split("-")[1].slice(1);
      if (parseInt(month) === parseInt(date.getMonth() + 1)) {
        countUserRegsCurrentMonth++;
      }
      if (parseInt(month) === parseInt(date.getMonth())) {
        countUserRegsLastMonth++;
      }

      if (parseInt(month) === 1) {
        const dataItem = data.find(
          (ditem) => parseInt(ditem.month) === parseInt(month)
        );
        if (dataItem) {
          dataItem.user = dataItem.user + 1;
        }
      }
      if (parseInt(month) === 2) {
        const dataItem = data.find(
          (ditem) => parseInt(ditem.month) === parseInt(month)
        );
        if (dataItem) {
          dataItem.user = dataItem.user + 1;
        }
      }
      if (parseInt(month) === 3) {
        const dataItem = data.find(
          (ditem) => parseInt(ditem.month) === parseInt(month)
        );
        if (dataItem) {
          dataItem.user = dataItem.user + 1;
        }
      }
      if (parseInt(month) === 4) {
        const dataItem = data.find(
          (ditem) => parseInt(ditem.month) === parseInt(month)
        );
        if (dataItem) {
          dataItem.user = dataItem.user + 1;
        }
      }
      if (parseInt(month) === 5) {
        const dataItem = data.find(
          (ditem) => parseInt(ditem.month) === parseInt(month)
        );
        if (dataItem) {
          dataItem.user = dataItem.user + 1;
        }
      }
      if (parseInt(month) === 6) {
        const dataItem = data.find(
          (ditem) => parseInt(ditem.month) === parseInt(month)
        );
        if (dataItem) {
          dataItem.user = dataItem.user + 1;
        }
      }
      if (parseInt(month) === 7) {
        const dataItem = data.find(
          (ditem) => parseInt(ditem.month) === parseInt(month)
        );
        if (dataItem) {
          dataItem.user = dataItem.user + 1;
        }
      }
      if (parseInt(month) === 8) {
        const dataItem = data.find(
          (ditem) => parseInt(ditem.month) === parseInt(month)
        );
        if (dataItem) {
          dataItem.user = dataItem.user + 1;
        }
      }
      if (parseInt(month) === 9) {
        const dataItem = data.find(
          (ditem) => parseInt(ditem.month) === parseInt(month)
        );
        if (dataItem) {
          dataItem.user = dataItem.user + 1;
        }
      }
      if (parseInt(month) === 10) {
        const dataItem = data.find(
          (ditem) => parseInt(ditem.month) === parseInt(month)
        );
        if (dataItem) {
          dataItem.user = dataItem.user + 1;
        }
      }
      if (parseInt(month) === 11) {
        const dataItem = data.find(
          (ditem) => parseInt(ditem.month) === parseInt(month)
        );
        if (dataItem) {
          dataItem.user = dataItem.user + 1;
        }
      }
      if (parseInt(month) === 12) {
        const dataItem = data.find(
          (ditem) => parseInt(ditem.month) === parseInt(month)
        );
        if (dataItem) {
          dataItem.user = dataItem.user + 1;
        }
      }
    });

  const handleDeleteUser = async (userId) => {
    await axios.delete(`http://localhost:8080/api/v1/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user"))?.accessToken || null
        }`,
      },
    });
    getUserList();
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="dashboard-top">
        <div className="dashboard-featured">
          <div>
            <span>Số đơn tháng này:</span>
            <b>{orderCountCurrent}</b>
          </div>

          <div>
            <span>Số đơn tháng trước:</span>
            <b>{orderCountLast}</b>
          </div>
          <div>
            <span>Thống kê</span>
            <b>
              {" "}
              {orderCountCurrent < orderCountLast ? (
                <HiTrendingDown style={{ color: "red" }} />
              ) : (
                <HiTrendingUp style={{ color: "green" }} />
              )}
            </b>
          </div>
        </div>
        <div className="dashboard-featured">
          <div>
            <span>Doanh thu tháng này:</span>
            <b>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(totalPriceCurrentMonth)}
            </b>
          </div>

          <div>
            <span>Doanh thu tháng trước:</span>
            <b>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(totalPriceLastMonth)}
            </b>
          </div>
          <div>
            <span>Thống kê</span>
            <b>
              {" "}
              {totalPriceCurrentMonth < totalPriceLastMonth ? (
                <HiTrendingDown style={{ color: "red" }} />
              ) : (
                <HiTrendingUp style={{ color: "green" }} />
              )}
            </b>
          </div>
        </div>
        <div className="dashboard-featured">
          <div>
            <span>Số người dùng đăng kí tháng này:</span>
            <b>{countUserRegsCurrentMonth}</b>
          </div>

          <div>
            <span>Số người dùng đăng kí tháng trước:</span>
            <b>{countUserRegsLastMonth}</b>
          </div>
          <div>
            <span>Thống kê</span>
            <b>
              {" "}
              {countUserRegsCurrentMonth < countUserRegsLastMonth ? (
                <HiTrendingDown style={{ color: "red" }} />
              ) : (
                <HiTrendingUp style={{ color: "green" }} />
              )}
            </b>
          </div>
        </div>
      </div>
      <div className="dashboard-main">
        <div className="dashboard-user-table">
          <table>
            <tr>
              <th>Email</th>
              <th>Ngày đăng ký</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>

            {userList &&
              userList.map((item) => {
                return (
                  <tr>
                    <td>{item.username}</td>
                    <td>{item.createdDate.split("T")[0]}</td>
                    <td>
                      {item.status === 1 ? (
                        <span style={{ color: "green" }}>Đang hoạt động</span>
                      ) : (
                        <span style={{ color: "red" }}>Không hoạt động</span>
                      )}
                    </td>
                    <td>
                      {/* <button className="dashboard-btn">Thêm</button>
                      <button className="dashboard-btn">Sửa</button> */}
                      <button
                        onClick={() => handleDeleteUser(item.id)}
                        className="dashboard-btn"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
        <div className="dashboard-charts">
          <UserChart data={data} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
