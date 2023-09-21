import React from 'react'
import { CourseCard } from '../Card/cards';
import Button from '@mui/material/Button';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

function HomeCards() {
  return (
 
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2 ">
        {/* First CourseCard */}
        <div className="mb-4">
          <CourseCard />
        </div>
        <div className="mb-4">
          <CourseCard />
        </div>
        <div className="mb-4">
          <CourseCard />
        </div>
        <div className="mb-4 ">
          <CourseCard />
        </div>
        <Button className='z-50' variant='contained' sx={{position:'absolute',top:"50rem",left:"0rem",transform:"translateX(0%) rotate(-90deg)",bgcolor:"white"}} >
         <ArrowLeftIcon sx={{transform:"rotate(90deg)", color:"black"}}/>
        </Button>

        <Button className='z-50' variant='contained' sx={{position:'absolute',top:"50rem",right:"0rem",transform:"translateX(0%) rotate(90deg)",bgcolor:"white"}} >
         <ArrowLeftIcon sx={{transform:"rotate(90deg)", color:"black"}}/>
        </Button>

       
      </div>
   
  )
}

export default HomeCards
