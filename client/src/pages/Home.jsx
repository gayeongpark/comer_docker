import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Header from '../components/Header/Header';
import Products from '../components/products/Products';
import Footer from '../components/Footer/Footer';

export default function Home() {
  return (
    <div>
      <Navbar />
      <Header/>
      <Products />
      <Footer />
    </div>
  );
}
