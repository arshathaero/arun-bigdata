import logo from './logo.svg';
import './App.css';
import { Route, Switch,Redirect,useHistory,useLocation } from 'react-router-dom';
import Layout from './Hoc/Layout'
import Homepage from './Pages/Homepage/Homepage'
import Auth from './Pages/Auth/Auth'

import Search from './Pages/Search/Search'

import Pinboard from './Pages/Pinboard/Pinboard'

import Insights from './Pages/Insights/Insights'

import Profile from './Pages/Profile/Profile'


function App() {
  

  let authenticated = localStorage.getItem("token");



  let history = useHistory();
  let location = useLocation();

  const ProtectedRoutes = ({ children, ...rest }) => {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          authenticated ? (
            children
          ) : (
            <Redirect to={{ pathname: "/auth", state: { from: location } }} />
          )
        }
      />
    );
  };




  return (

    <Switch>

    <ProtectedRoutes path='/search' ><Layout><Search  /></Layout></ProtectedRoutes>

    <ProtectedRoutes path='/pinboard' ><Layout><Pinboard  /></Layout></ProtectedRoutes>

      <ProtectedRoutes path='/insights' ><Layout><Insights /></Layout></ProtectedRoutes>
      <ProtectedRoutes path='/profile' ><Layout><Profile  /></Layout></ProtectedRoutes>

      <ProtectedRoutes path='/' exact><Layout><Homepage /></Layout></ProtectedRoutes>
      
      <Route path='/auth'><Auth/></Route>

   </Switch>
  )
}

export default App;
