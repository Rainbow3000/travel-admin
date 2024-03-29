import React from 'react'
import './sidebar.scss'
import {AiOutlineHome} from 'react-icons/ai'
import {BiCategoryAlt} from 'react-icons/bi'
import {SiYourtraveldottv} from 'react-icons/si'
import {MdOutlineFeaturedPlayList} from 'react-icons/md'
import {MdOutlinePriceChange} from 'react-icons/md'
import {AiOutlineSchedule,AiOutlineSetting} from 'react-icons/ai'
import {BsCalendar2Date,BsCartCheck} from 'react-icons/bs'
import {BiBookContent,BiCommentDetail} from 'react-icons/bi'
import {Link, useNavigate} from 'react-router-dom'

const Sidebar = () => {

  const navigate = useNavigate(); 

  const handleLogout = ()=>{
    localStorage.removeItem('user'); 
    navigate('/login'); 
  }
  return (
    <div className='sidebar-container'>
        <div className='sidebar-logo'>
            <h1>LINK-TRAVEL</h1>
        </div>
        <div className='sidebar-content'>
          <ul>
            <Link className='link' to="/">
              <li><AiOutlineHome/>&nbsp;&nbsp;&nbsp;Dashboard</li>
            </Link>

            <Link className='link' to="/category">
                 <li><BiCategoryAlt/>&nbsp;&nbsp;&nbsp;Danh Mục</li>
            </Link>

            <Link className='link' to="/travel">
                 <li><SiYourtraveldottv/>&nbsp;&nbsp;&nbsp;Bài Viết</li>
            </Link>

            <Link className='link' to="/travel/details/image">
                 <li><SiYourtraveldottv/>&nbsp;&nbsp;&nbsp;Ảnh Chi Tiết</li>
            </Link>
            <Link className='link' to="/travel/featured">
                <li><MdOutlineFeaturedPlayList/>&nbsp;&nbsp;&nbsp;Mục Nổi Bật</li>
            </Link>
            <Link className='link' to="/travel/priceTable">
               <li><MdOutlinePriceChange/>&nbsp;&nbsp;&nbsp;Bảng Giá</li>
            </Link>
            <Link className='link' to="/travel/schedule">
               <li><AiOutlineSchedule/>&nbsp;&nbsp;&nbsp;Lịch Trình</li>
            </Link>
            <Link className='link' to="/travel/schedule/date">
              <li><BsCalendar2Date/>&nbsp;&nbsp;&nbsp;Lịch Trình Ngày</li>
            </Link>
            <Link className='link' to="/travel/order">
             <li><BsCartCheck/>&nbsp;&nbsp;&nbsp;Đơn Đặt Lịch</li>
            </Link>

            <Link className='link' to="/travel/comments">
                <li><BiCommentDetail/>&nbsp;&nbsp;&nbsp;Bình Luận</li>
            </Link>

            <li onClick={handleLogout} ><AiOutlineSetting/>&nbsp;&nbsp;&nbsp;Đăng Xuất</li>
          </ul>
        </div>
    </div>
  )
}

export default Sidebar
