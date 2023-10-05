import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { UserBaseUrl } from '../../../Api';
import image from '../../../assets/instructor.jpg'
import { Button } from '@material-tailwind/react';

function TutorCard() {
  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    axios.get(`${UserBaseUrl}/allTutors`)
      .then((response) => {
        console.log(response);
        setTutors(response.data.allTutors);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="flex-shrink-0 w-full p-4">
      {tutors.map((tutor, index) => (
        <div key={index} className="bg-white rounded-lg shadow-lg" style={{ width: '200px', height: '320px' }}>
          <img src={tutor.image || image} alt="Tutor Image" className="w-full h-64 object-cover object-center"  style={{ width: '200px', height: '200px' }}/>
         
            <h3 className="text-lg font-semibold text-center mt-3">{tutor.tutorName}</h3>
            
             
            <Button size="xs" fullWidth={true} style={{ cursor: "pointer" }} className="text-sm mt-5">
             Know More
</Button>

       
        </div>
      ))}
    </div>
  );
}

export default TutorCard;
