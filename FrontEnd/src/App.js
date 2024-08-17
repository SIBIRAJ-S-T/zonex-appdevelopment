import React, { useState } from 'react';
import './App.css';
import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FrontPage from './FrontPage';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import DeleteAcc from './DeleteAcc';
import UpdatePass from './UpdatePass';
import YourApp from './YourApp';
import YourAppbuy from './YourAppbuy';
import AppDetails from './AppDetails';
import MyProducts from './MyProducts';
import EditProduct from './EditProduct';
import Favourites from './Favourities';
import Loading from './Loading';
import About from './Extras/About';
import Services from './Extras/Services';
import Terms from './Extras/Terms';
import Contact from './Extras/Contact';
import About2 from './Extras/About2';
import Services2 from './Extras/Services2';
import Terms2 from './Extras/Terms2';
import Contact2 from './Extras/Contact2';
import Chat from './Chat';
import Auction from './Auction';
import AuctionDetails from './AuctionDetails';
import AuctionSell from './AuctionSell';
import Phone from './Phone';


// PrivateRoute component to protect routes that require authentication
const PrivateRoute = ({ children, authenticated }) => {
  return authenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  // Check if authentication status is stored in localStorage
  const storedAuth = localStorage.getItem('authenticated');
  const [authenticated, setAuthenticated] = useState(storedAuth === 'true');

  // Function to set authentication status in both state and localStorage
  const setAuthStatus = (status) => {
    setAuthenticated(status);
    localStorage.setItem('authenticated', status);
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route
            path="/login"
            element={<Login setAuthStatus={setAuthStatus} />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/loading" element={<Loading />} />
          
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/about2" element={<About2 />} />
          <Route path="/services2" element={<Services2 />} />
          <Route path="/terms2" element={<Terms2 />} />
          <Route path="/contact2" element={<Contact2 />} />


          {/* Use element property to render PrivateRoute */}
          <Route
            path="/home"
            element={
              <PrivateRoute authenticated={authenticated}>
                <Home setAuthStatus={setAuthStatus} />
              </PrivateRoute>
            }
          />
          <Route
              path="/deleteacc"
              element={
                <PrivateRoute authenticated={authenticated}>
                  <DeleteAcc />
                </PrivateRoute>
              }
          />
          <Route
            path="/updatepass"
            element={
              <PrivateRoute authenticated={authenticated}>
                <UpdatePass />
              </PrivateRoute>
            }
          />
          <Route
            path="/yourapp"
            element={
              <PrivateRoute authenticated={authenticated}>
                <YourApp />
              </PrivateRoute>
            }
          />
          <Route
            path="/yourappbuy"
            element={
              <PrivateRoute authenticated={authenticated}>
                <YourAppbuy />
              </PrivateRoute>
            }
          />
          <Route
            path="/app-details"
            element={
              <PrivateRoute authenticated={authenticated}>
              <AppDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/myproducts"
            element={
              <PrivateRoute authenticated={authenticated}>
              <MyProducts />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-product"
            element={
              <PrivateRoute authenticated={authenticated}>
              <EditProduct />
              </PrivateRoute>
            }
          />
          <Route
            path="/favourities"
            element={
              <PrivateRoute authenticated={authenticated}>
              <Favourites />
              </PrivateRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <PrivateRoute authenticated={authenticated}>
              <Chat />
              </PrivateRoute>
            }
          />
          <Route
            path="/auction"
            element={
              <PrivateRoute authenticated={authenticated}>
              <Auction />
              </PrivateRoute>
            }
          />
          <Route
            path="/auction-sell"
            element={
              <PrivateRoute authenticated={authenticated}>
              <AuctionSell />
              </PrivateRoute>
            }
          />
          <Route
            path="/auction-details/:id"
            element={
              <PrivateRoute authenticated={authenticated}>
              <AuctionDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/phone"
            element={
              <PrivateRoute authenticated={authenticated}>
              <Phone />
              </PrivateRoute>
            }
          />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
