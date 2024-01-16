//private Route
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice/userSlice';
import { selectTutor } from '../features/tutorSlice/tutorSlice';
import { selectAdmin } from '../features/adminSlice/adminSlice';

const PrivateRoutes = ({ userType }: { userType: string }) => {
  const navigate = useNavigate();
  let user: any = null;

  if (userType === 'user') {
    user = useSelector(selectUser);
  } else if (userType === 'tutor') {
    user = useSelector(selectTutor);
  } else if (userType === 'admin') {
    user = useSelector(selectAdmin);
  }

  useEffect(() => {
    if (!user) {
      // Redirect to the login page based on the user type when the component mounts
      if (userType === 'user') {
        navigate('/login');
      } else if (userType === 'tutor') {
        navigate('/tutorLogin');
      } else if (userType === 'admin') {
        navigate('/adminLogin');
      }
    }
  }, [user, navigate, userType]);

  return user ? <Outlet /> : null;
};

export default PrivateRoutes;
