import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserBaseUrl } from "../../../Api";
import { RingLoader } from "react-spinners";
import { Link } from "react-router-dom";

interface TutorDetails {
  photo: string;
  tutorName: string;
  description: string;
  tutorEmail: string;
  phone: string;
}

function TutorSingleViews({ tutorId }: any) {
  const [tutorDetails, setTutorDetails] = useState<TutorDetails>({
    photo: "",
    tutorName: "",
    description: "",
    tutorEmail: "",
    phone: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  
    axios
      .get(`${UserBaseUrl}/tutor/${tutorId}`)
      .then((response) => {
        console.log(response, "tutorById");
        setTutorDetails(response.data);
        setLoading(false); 
      })
      .catch((error) => {
        console.error(error);
      });
  }, [tutorId]);

  return (
    <section className="pt-10 overflow-hidden dark:bg-black  bg-gray-100 md:pt-0 sm:pt-16 2xl:pt-16">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        {loading ? ( 
          <div className="flex justify-center items-center h-64">
            <RingLoader color="#000000" size={150} />
          </div>
        ) : (
          <div className="grid items-center grid-cols-1 md:grid-cols-2">
            <div>
              <h2 className="text-3xl dark:text-white font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
                Hey 👋 I am
                <br />
                <br className="block sm:hidden" />
                {tutorDetails?.tutorName}
              </h2>
              <p className="max-w-lg mt-3 text-md leading-relaxed text-gray-600 md:mt-8">
                Email: {tutorDetails?.tutorEmail}
              </p>

              <p className="mt-4 text-sm text-gray-600 md:mt-8">
                <span className="relative inline-block">
                  <span className="absolute inline-block w-full bottom-0.5 h-2 "></span>
                  <span className="relative"> Have a question? </span>
                  <br />
                  <Link to={'/courses'}>
                  
                  <button className="btn btn-active btn-accent mt-5 text-sm font-medium text-white rounded-md">
                    Buy Our Course
                  </button>
                  </Link>
                </span>
              </p>
            </div>

            <div className="relative ">
              <img
                className="absolute inset-x-0 bottom-0 -mb-48 -translate-x-1/2 left-1/2"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/team/1/blob-shape.svg"
                alt=""
              />
              <img
                className="relative w-72 rounded-badge  h-2/3 xl:max-w-lg xl:mx-auto 2xl:origin-bottom 2xl:scale-110"
                src={tutorDetails.photo}
                alt={tutorDetails.tutorName}
                onLoad={() => setLoading(false)} 
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default TutorSingleViews;
