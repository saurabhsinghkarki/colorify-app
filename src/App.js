import { useState, useEffect } from 'react';
import Home from './components/Home';
import Login from './components/Login';


function App() {

  const [activeUser, setActiveUser] = useState(null);

  useEffect(() => {
    let user = localStorage.getItem('user');
    if (user) setActiveUser(user);
  }, [activeUser])

  return (
    <div className="App">
      {
        activeUser ?
          <Home activeUser={activeUser} setActiveUser={setActiveUser} /> :
          <Login setActiveUser={setActiveUser} />
      }
    </div>
  )
}

export default App
