import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';
import './globals.css'
import Signin from './pages/Signin/Signin'
import Signup from './pages/Signup/Signup';
import MainPageUser from './pages/MainPageUser/MainPageUser';
import TicketCreationPageUser from './pages/TicketCreationPageUser/TicketCreationPageUser';
import TicketWatchPageUser from './pages/TicketWatchPageUser/TicketWatchPageUser'
import MainPageAdmin from './pages/MainPageAdmin/MainPageAdmin';
import TicketWatchPageAdmin from './pages/TicketWatchPageAdmin/TicketWatchPageAdmin';
import ProtectedRoutes from './protected/Protected'
import axios from 'axios';
import ProtectedByRole from './protected/ProtectedByRole';
import NewsPageUser from './pages/NewsPageUser/NewsPageUser';
import ProfilePage from './pages/ProfilePage/ProfilePage';

function App() {
  const token = localStorage.getItem('token');
  console.log(token);
  const [isAuth, setAuth] = useState(false);
  
  const navigate = useNavigate();
  useEffect(() => {
  if(isAuth != undefined) {
    console.log(token)
  axios.post('http://localhost:3000/auth/checktoken', 
    {
      headers: { 
          'Content-Type': 'application/json', 
          'authorization': `Bearer ${localStorage.getItem('token')}`
      },
  },
  ).then(setAuth(true)).catch(error => {
    console.log(error);
    setAuth(false);
  });
  } else {
    setAuth(false); 
  }
 },[]);
  return (
    <div className="wrapper">
      <Routes>
      <Route element={<ProtectedByRole isAuth={!isAuth}/>}>
        <Route path="/" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
      </Route>
    <Route element={<ProtectedRoutes isAuth={isAuth}/>}>
    
      <Route element={<ProtectedByRole isRole={'Student'}/>}>
          <Route path="main-page-user" element={<MainPageUser />} />
          <Route path="ticket-creation-page-user" element={<TicketCreationPageUser />} />
          <Route path="ticket-watch-page-user/:id" element={<TicketWatchPageUser />} />
          <Route path="news-page-user" element={<NewsPageUser />} />
          <Route path="profile-page" element={<ProfilePage />} />
      </Route>

      <Route element={<ProtectedByRole isRole={'Confidant'}/>}>
          <Route path="ticket-watch-page-admin/:id" element={<TicketWatchPageAdmin />} />
          <Route path="main-page-admin" element={<MainPageAdmin />} />
      </Route>
        
    </Route>

  </Routes>
    </div>
  )
}

export default App
