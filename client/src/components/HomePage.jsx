import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Slider from 'react-slick'

import SimpleSlider from './SimpleSlider.jsx'
import Cards from './Cards.jsx'

const HomePage = () => (
  <div>
  <SimpleSlider />,
  <Cards />
  </div>
  );

export default HomePage;