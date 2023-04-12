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
import {Link} from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar-container'>
        <div className='sidebar-logo'>
            <h1>LINK-TRAVEL</h1>
        </div>
        <div className='sidebar-content'>
          <ul>
            <Link className='link' to="/">
              <li><AiOutlineHome/>Dashboard</li>
            </Link>

            <Link className='link' to="/category">
                 <li><BiCategoryAlt/>Category</li>
            </Link>

            <Link className='link' to="/travel">
                 <li><SiYourtraveldottv/>Travel</li>
            </Link>

            <Link className='link' to="/travel/details/image">
                 <li><SiYourtraveldottv/>Travel Details Img</li>
            </Link>
            <Link className='link' to="/travel/featured">
                <li><MdOutlineFeaturedPlayList/>Travel Featured</li>
            </Link>
            <Link className='link' to="/travel/priceTable">
               <li><MdOutlinePriceChange/>Travel Price Table</li>
            </Link>
            <Link className='link' to="/travel/schedule">
               <li><AiOutlineSchedule/>Travel Schedule</li>
            </Link>
            <Link className='link' to="/travel/schedule/date">
              <li><BsCalendar2Date/>Travel Schedule Date</li>
            </Link>
            <Link className='link' to="/travel/schedule/content">
              <li><BiBookContent/>Travel Schedule Content</li>
            </Link>
            <Link className='link' to="/travel/order">
             <li><BsCartCheck/>Order</li>
            </Link>

            <Link className='link' to="/travel/comments">
                <li><BiCommentDetail/>Comments</li>
            </Link>

            <li><AiOutlineSetting/>Settings</li>
          </ul>
        </div>
    </div>
  )
}

export default Sidebar
