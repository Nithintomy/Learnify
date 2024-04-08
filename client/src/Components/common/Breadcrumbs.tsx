import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import queryString from 'query-string';

function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((path) => path !== '');
  const queryParams = queryString.parse(location.search);
  const courseName = queryParams.courseName;

  return (
    <div className="text-sm font-bold text-blue-900 breadcrumbs p-5 mb-5">
      <ul>
        <li>
          <Link to="/tutor_dashboard">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            Home
          </Link>
        </li>
        {pathnames.map((path, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const breadcrumbText = isLast ? (courseName || path) : path;
          const breadcrumbLink = isLast ? null : routeTo;
          return (
            <li key={index}>
              {breadcrumbLink ? (
                <Link to={breadcrumbLink}>{breadcrumbText}</Link>
              ) : (
                <span>{breadcrumbText}</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Breadcrumbs;
