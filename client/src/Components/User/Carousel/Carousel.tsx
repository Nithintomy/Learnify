import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import carousel1 from '../../../assets/book-1822474.jpg';
import carousel2 from '../../../assets/girl-3528292.jpg';
import carousel3 from '../../../assets/pick-532097.jpg';

const AutoCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    // Automatically change the slide every 3 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  const totalSlides = 3; // Replace with the actual number of slides

  return (
    <div className="w-4/5 mx-auto"> {/* Adjust width as needed */}
      <Carousel
        showArrows={true}
        infiniteLoop={true}
        selectedItem={currentIndex}
        onChange={(index) => setCurrentIndex(index)}
        showStatus={false} 
        showThumbs={false} 
      >
        <div className="h-64 md:h-96"> {/* Adjust height as needed */}
          <img src={carousel1} alt="Image 1" className="object-cover w-full h-full" />
        </div>
        <div className="h-64 md:h-96"> {/* Adjust height as needed */}
          <img src={carousel2} alt="Image 2" className="object-cover w-full h-full" />
        </div>
        <div className="h-64 md:h-96"> {/* Adjust height as needed */}
          <img src={carousel3} alt="Image 3" className="object-cover w-full h-full" />
        </div>
        {/* Add more slides as needed */}
      </Carousel>
    </div>
  );
};

export default AutoCarousel;
