import React from 'react';

import Dart from '../../../assets/Dart.png';
import Docker from '../../../assets/Docker.png';
import Android from '../../../assets/Android.png';
import java from '../../../assets/Java.png';
import javaScript from '../../../assets/JavaScript.png';
import Angular from '../../../assets/Raspian-copy-100.jpg';
import python from '../../../assets/Python.png';
import Reactimg from '../../../assets/React-JS.png';

function Categories() {
  return (
    <div className="flex overflow-x-auto space-x-4 p-4">
      <img className="w-16 h-auto" src={Dart} alt="Dart logo" />
      <img className="w-16 h-auto" src={Docker} alt="Docker logo" />
      <img className="w-16 h-auto" src={Android} alt="Android logo" />
      <img className="w-16 h-auto" src={java} alt="Java logo" />
      <img className="w-16 h-auto" src={javaScript} alt="JavaScript logo" />
      <img className="w-16 h-auto" src={Angular} alt="Angular logo" />
      <img className="w-16 h-auto" src={python} alt="Python logo" />
      <img className="w-16 h-auto" src={Reactimg} alt="React logo" />
    </div>
  );
}

export default Categories;
