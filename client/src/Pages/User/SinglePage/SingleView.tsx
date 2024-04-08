import React from 'react';
import RatingComponent from '../../../Components/User/Rating/Rating';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../features/userSlice/userSlice';
import Navbars from '../../../Components/User/Navbar/Navbars';
import SinglePages from '../../../Components/User/SinglePage/SinglePages';

function SingleView() {
  const { courseId } = useParams();
  const user = useSelector(selectUser);

  return (
    <div className="dark:bg-black  bg-gray-200 h-full">
      <Navbars />

      <div className="px-3 dark:bg-black  ">
        <SinglePages/>
      </div>

      { user.user  && (
        <div className="px-4 shadow-lg bg-gray-200 ">
          <h2 className="text-2xl  font-semibold mb-4">Course Ratings and Comments</h2>
          <RatingComponent courseId={courseId || ''} />
        </div>
      )}
    </div>
  );
}

export default SingleView;
