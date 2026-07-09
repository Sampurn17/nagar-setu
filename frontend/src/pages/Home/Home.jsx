import React from 'react';
import Navbar from '../../components/Navbar';
import Hero from './HomeSections/Hero';
import Features from './HomeSections/Features'
import Connect from './HomeSections/Connect'
import Review from './HomeSections/Review';

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Features/>
      <Connect/>
      <Review/>
    </div>
  );
};

export default Home;