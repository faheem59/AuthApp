import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import AdminHomePage from '../pages/AdminHome';
import LoginSignupPage from '../pages/LoginSignuPage';
import ProfilePage from '../pages/ProfilePage';
import Navbar from '../components/commonComponet/Navbar';
const AllRoutes = () => {
  return (
    <>
          <Router>
            <Navbar/>
              <Routes>
                  <Route path="/" element={<PrivateRoute />}>
                      <Route path="/home" element={<AdminHomePage />} />
                  </Route>
                  <Route path="/login" element={<LoginSignupPage formType="login" />}>

                  </Route>
                  <Route path="/signup" element={<LoginSignupPage formType="signup" />}>

                  </Route>
                  <Route path='/profile/:id' element={<ProfilePage />}></Route>
              </Routes>
          </Router>
    </>
  )
}

export default AllRoutes