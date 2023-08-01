import Navbar from './Navbar';
import Home from './Home';
import Login from './Login';
import Logout from './Logout';
import Signup from './Signup';
import About from './About';
import List from './List';
import Reserve from './Reserve';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Create from './Create';
import EditBook from './EditBook';

import { useState } from 'react';

import CurrentUserContext from './CurrentUserContext';
function App() {

  const [currentUser, setCurrentUser] = useState(null);

  return (
    <BrowserRouter>
      <div className="App">
        <CurrentUserContext.Provider
          value={{
            currentUser,
            setCurrentUser
          }}
        >
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/about" element={<About />} />
              <Route path="/list" element={<List />} />
              <Route path="/create" element={<Create />} />
              <Route path="/editBook" element={<EditBook />} />
            </Routes>
          </div>
        </CurrentUserContext.Provider>
      </div>

    </BrowserRouter>
  );
}

export default App;
