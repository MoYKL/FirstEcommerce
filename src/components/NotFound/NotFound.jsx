import React from 'react'
import NotFoundPic from './../../assets/404.jpg'
import styles from './NotFound.module.css' 

export default function NotFound() {
  return (
    <div className=" container mx-auto">    
    <img src={NotFoundPic} className='w-full' alt="" />
    </div>
  )
}
