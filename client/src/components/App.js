import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
// import Landing from './pages/Landing';
// import About from './pages/About';
// import Shop from './shop/Shop';
import Header from './Header';
import Chatbot from './chatbot/Chatbot';


const App = () => {
  return (
  <div>
    <BrowserRouter>
    <div className="container">
      <div className="row">
        <div className="col s5"><Header /></div>
        <div className="col s7"><Chatbot/></div>
      </div>
    </div>
    </BrowserRouter>
  </div>
  )
}

export default App;