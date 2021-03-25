import logo from './logo.svg';
import './App.css';
import { Route, Switch,Redirect,useHistory,useLocation } from 'react-router-dom';
import Layout from './Hoc/Layout'
import Homepage from './Pages/Homepage/Homepage'
import Search from './Pages/Search/Search'

import Pinboard from './Pages/Pinboard/Pinboard'

import Insights from './Pages/Insights/Insights'



function App() {
  
  return (

    <Switch>

    <Route path='/search' ><Layout><Search  /></Layout></Route>

    <Route path='/pinboard' ><Layout><Pinboard  /></Layout></Route>

    <Route path='/insights' ><Layout><Insights  /></Layout></Route>
    <Route path='/' exact><Layout><Homepage  /></Layout></Route>

   </Switch>
  )
}

export default App;
