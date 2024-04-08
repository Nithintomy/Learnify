import React from "react";
import ParticlesComponent from "./config/Particlesconfig";
import Ai from '../../../assets/Ai.jpeg'
import Node_js from '../../../assets/Node_js.jpeg'
import js from '../../../assets/JavaScript.png'
import python from '../../../assets/python-main.jpeg'
import java from '../../../assets/Java.png'
import Dart from '../../../assets/Dart.png'
import { Link } from "react-router-dom";


function Hero() {
  return (
    <div className="relative ">
      <div className="hero min-h-screen dark:text-white dark:bg-black bg-base-200">
        <div className="hero-content lg:flex-row-reverse relative z-10">
          <div className="lg:w-full lg:h-full lg:max-h-screen lg:overflow-hidden gap-3 lg:flex lg:items-center">
            <div className="avatar hidden lg:block">
              <div className="w-44 rounded-xl ">
                <img src={Ai} />
              </div>
            </div>
            <div className="avatar hidden lg:block">
              <div className="w-32 rounded-xl ">
                <img
                  src={python}
                  alt="Tailwind-CSS-Avatar-component"
                />
              </div>
            </div>
            <div className="avatar hidden lg:block">
              <div className="w-20 rounded-xl">
                <img
                  src={Node_js}
                  alt="Tailwind-CSS-Avatar-component"
                />
              </div>
            </div>
            <div className="avatar hidden lg:block">
              <div className="w-16 rounded-xl">
                <img
                  src={java}
                  alt="Tailwind-CSS-Avatar-component"
                />
              </div>
            </div>
            <div className="avatar hidden lg:block">
              <div className="w-8 rounded-xl">
                <img
                  src={js}
                  alt="Tailwind-CSS-Avatar-component"
                />
              </div>
            </div>
            <div className="avatar hidden lg:block">
              <div className="w-4 rounded-xl">
                <img
                  src={Dart}
                  alt="Tailwind-CSS-Avatar-component"
                />
              </div>
            </div>
          </div>
          <div className="">
            <h1 className="text-5xl font-bold">
              Welcome to <span className="text-blue-600">Learnify</span>!
            </h1>
            <p className="py-6">Start your learning journey with us.</p>
            <Link to='/courses'>

            <button className="btn btn-primary"> Explore Our Courses</button>
            </Link>
          </div>
        </div>
        <ParticlesComponent id="uniqueParticlesId" />
      </div>
    </div>
  );
}

export default Hero;
