import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserBaseUrl } from "../../../Api";
import image from "../../../assets/instructor.jpg";
import { Link } from "react-router-dom";
import { Tutor } from "../../../features/tutorSlice/tutorSlice";
import { RingLoader } from "react-spinners";

function TutorCard() {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${UserBaseUrl}/allTutors`)
      .then((response) => {
        console.log(response);
        setTutors(response.data.allTutors);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <RingLoader
          loading={true}
          color="#000000"
          speedMultiplier={1}
          size={150}
        />
      </div>
    );
  }
  return (
    <>
      {tutors.map((tutor, index) => (
        <div key={index} className="card w-96  shadow-xl image-full">
          <figure>
            <img
              src={tutor.photo || image}
              alt="Shoes"
              style={{ width: '230px', height: '200px' }}
              loading="lazy" 
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{tutor?.tutorName}</h2>
            
            <div className="card-actions justify-end">
                <Link to={`/tutor_details/${tutor?._id}`}>
                
              <button style={{ cursor: 'pointer' }}  className="btn btn-primary">Details</button>
                </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default TutorCard;
