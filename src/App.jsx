import { Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import Header from "./components/header/Header";
import Category from "./pages/category/Category";
import "./app.scss";
import Dashboard from "./pages/dashboard/Dashboard";
import Travel from "./pages/travel/Travel";
import TravelFeatured from "./pages/travelFeatured/TravelFeatured";
import PriceTable from "./pages/priceTable/PriceTable";
import TravelSchedule from "./pages/travelSchedule/TravelSchedule";
import ScheduleDate from "./pages/ScheduleDate/ScheduleDate";
import ScheduleContent from "./pages/scheduleContent/ScheduleContent";
import Comment from "./pages/comment/Comment";
import Order from "./pages/Order/Order";
import TravelImg from "./pages/travelImg/TravelImg";
import OrderDetails from "./pages/orderdetails/OrderDetails";
import Login from "./pages/login/Login";
import { useEffect, useState } from "react";


function App() {
  const navigate = useNavigate(); 
  const [user,setUser] = useState(null); 
  useEffect(()=>{
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null; 
    if(user === null){
      navigate('/login'); 
    }
    setUser(user); 
  },[navigate])

  return (
      <>
      {
        user === null && <Login/>
      }
    {
      user && (
        <div className="app-container">
        {
          user && (
            <Sidebar />
          )
        }
       
        <div className="main">
          {
            user && (
              <Header />
            )
          }
          
          <div className="main-content">
            <Routes>
              <Route
                path="/travel/order/details/:id"
                element={<OrderDetails />}
              />
               <Route
                path="/login"
                element={<Login />}
              />
              <Route path="/category" element={<Category />} />
              <Route path="/travel" element={<Travel />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/travel/featured" element={<TravelFeatured />} />
              <Route path="/travel/priceTable" element={<PriceTable />} />
              <Route path="/travel/schedule" element={<TravelSchedule />} />
              <Route path="/travel/schedule/date" element={<ScheduleDate />} />
              <Route
                path="/travel/schedule/content"
                element={<ScheduleContent />}
              />
              <Route path="/travel/comments" element={<Comment />} />
              <Route path="/travel/order" element={<Order />} />
              <Route path="/travel/details/image" element={<TravelImg />} />
            </Routes>
          </div>
        </div>
      </div>
      )
    }
      </>

    
  );
}

export default App;
