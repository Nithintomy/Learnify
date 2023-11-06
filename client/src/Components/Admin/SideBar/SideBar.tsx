import React from 'react'
import { FaTachometerAlt, FaChevronRight,FaRegUser ,FaChalkboardTeacher,FaBook ,FaFolderOpen ,FaPlusCircle,FaShoppingCart   } from "react-icons/fa"




function SideBar() {
    return (
        <div className='bg-[#212533] px-[40px] h-screen'>
            <div className='px-[15px] py-[30px] flex items-center justify-center border-b-[1px] border-[#EDEDED]/[0.3]'>
                <h1 className='text-white text-[20px] leading-[24px] font-extrabold cursor-pointer'>Admin panel</h1>
            </div>
            <div className='flex items-center gap-[15px] py-[20px] border-b-[1px] border-[#EDEDED]/[0.3] cursor-pointer'>
                <FaTachometerAlt color='white' />
                <p className='text-[14px] leading-[20px] font-bold text-white'>Dashboard</p>
            </div>
            <div className='pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3]'>
                <p className='text-[10px] font-extrabold leading-[16px] text-white/[0.4]'> Users List</p>
                <div className='flex items-center justify-between gap-[10px] py-[15px] cursor-pointer'>
                    <div className='flex items-center gap-[10px]'>
                        <FaRegUser color='white'/> <p className='text-[14px] leading-[20px] font-bold text-white'> Users</p>
                    </div>
                    
                </div>
               
            </div>
            <div className='pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3]'>
            <p className='text-[10px] font-extrabold leading-[16px] text-white/[0.4]'> Tutors List</p>
                <div className='flex items-center justify-between gap-[10px] py-[15px] cursor-pointer'>
                    <div className='flex items-center gap-[10px]'>
                        <FaChalkboardTeacher  color='white' /> <p className='text-[14px] leading-[20px] font-bold text-white'>Tutors</p>
                    </div>
                 
                </div>
               
            </div>
            <div className='pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3]'>
            <p className='text-[10px] font-extrabold leading-[16px] text-white/[0.4]'> Courses List</p>
                <div className='flex items-center justify-between gap-[10px] py-[15px] cursor-pointer'>
                    <div className='flex items-center gap-[10px]'>
                        <FaBook color='white' /> <p className='text-[14px] leading-[20px] font-bold text-white'>Courses</p>
                    </div>
                   
                </div>
               
            </div>
            <div className='pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3]'>
                <p className='text-[10px] font-bold leading-[16px] text-white/[0.4]'> Category Table</p>
                <div className='flex items-center justify-between gap-[10px] py-[15px] cursor-pointer'>
                    <div className='flex items-center gap-[10px]'>
                        <FaPlusCircle  color='white' /> <p className='text-[14px] leading-[20px] font-normal text-white'>Add Category</p>
                    </div>
                    <FaChevronRight color='white' />
                </div>
                <div className='flex items-center justify-between gap-[10px] py-[15px] cursor-pointer'>
                    <div className='flex items-center gap-[10px]'>
                        <FaFolderOpen  color='white' /> <p className='text-[14px] leading-[20px] font-normal text-white'>Category List</p>
                    </div>
                    <FaChevronRight color='white' />
                </div>
               
            </div>
            <div className='pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3]'>
                <div className='flex items-center justify-between gap-[10px] py-[15px] cursor-pointer'>
                    <div className='flex items-center gap-[10px]'>
                        <FaShoppingCart  color='white' /> <p className='text-[14px] leading-[20px] font-bold text-white'>Orders</p>
                    </div>
                    <FaChevronRight color='white' />
                </div>
               
            </div>
           
         
        </div>
    )
}

export default SideBar
