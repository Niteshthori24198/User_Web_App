import React from 'react';
import Header from "./components/Header"
import Footer from "./components/Footer"
import AllRoutes from './components/AllRoutes';

function App() {
  return (
    <>
      <Header />
      <div className="content">
        <AllRoutes />
      </div>
      <Footer />
    </>

  );
}

export default App;
