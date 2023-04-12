import React from 'react'
import './header.scss'
import {BiBell} from 'react-icons/bi'
import {FiUser} from 'react-icons/fi'
import {AiOutlineSetting} from 'react-icons/ai'
const Header = () => {
  return (
    <div className='header-container'>
            <ul>
                <li><BiBell/> Notification</li>
                <li><FiUser/> Account</li>
                <li><AiOutlineSetting/> Settings</li>
            </ul>
    </div>
  )
}

export default Header
