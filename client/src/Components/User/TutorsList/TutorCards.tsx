import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserBaseUrl } from "../../../Api";
import image from "../../../assets/instructor.jpg";
import { Link } from "react-router-dom";
import { Tutor } from "../../../features/tutorSlice/tutorSlice";
import { RingLoader } from "react-spinners";

function TutorCards() {
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
    <div className="flex flex-wrap ">
      {tutors.map((tutor, index) => (
        <div key={index} className="card bg-gray-200 rounded-lg w-56 glass m-4">
          <figure>
            <img
              className="p-2 rounded-3xl"
              src={tutor.photo || image}
              alt="Tutor Image"
              style={{ width: '230px', height: '200px' }}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title justify-center">{tutor?.tutorName}</h2>
            <div className="card-actions justify-center">
              <Link to={`/tutor_details/${tutor?._id}`}>
                <button style={{ cursor: 'pointer' }} className="btn btn-primary">
                  Details!
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TutorCards;
