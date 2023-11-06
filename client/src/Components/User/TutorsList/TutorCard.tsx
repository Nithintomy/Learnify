import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UserBaseUrl } from '../../../Api';
import image from '../../../assets/instructor.jpg';
import { Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { Tutor } from '../../../features/tutorSlice/tutorSlice';

function TutorCard() {
  const [tutors, setTutors] = useState<Tutor[]>([]);

  useEffect(() => {
    axios
      .get(`${UserBaseUrl}/allTutors`)
      .then((response) => {
        console.log(response);
        setTutors(response.data.allTutors);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="flex-shrink-0 w-full p-5">
      <div
        className="flex flex-wrap -mx-4"
        style={{ display: 'flex', flexWrap: 'wrap' }}
      >
        {tutors.map((tutor, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg m-4"
            style={{ width: '200px', height: '320px' }}
          >
            <img
              src={tutor.photo || image}
              alt="Tutor Image"
              className="w-full h-64 object-cover object-center"
              style={{ width: '200px', height: '200px' }}
            />

            <h3 className="text-lg font-semibold text-center mt-3">
              {tutor?.tutorName}
            </h3>

            <Link to={`/tutor_details/${tutor?._id}`}>
              <Button
                size="xs"
                fullWidth={true}
                style={{ cursor: 'pointer' }}
                className="text-sm mt-5"
              >
                Know More
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TutorCard;
